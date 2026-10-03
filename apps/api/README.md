# @otc/api — TDD-бэкенд для OTC-площадки

Express 5 + TypeScript + Vitest + supertest. Node 20. Общие enum'ы и DTO — из `@otc/contracts`.

```bash
# из корня монорепо
npm install
npx turbo run test:watch --filter=@otc/api
# или: cd apps/api && npm run test:watch — держи открытым всё время работы
```

## Правила цикла

1. **RED** — один новый тест. Запусти и проверь, что он падает **по правильной причине** (assertion/ожидаемая ошибка, а не опечатка в импорте).
2. **GREEN** — минимальный код, чтобы тест прошёл. Хардкод допустим — следующий тест его «сломает» (triangulation).
3. **REFACTOR** — убрать дублирование в коде _и в тестах_, пока всё зелёное. Новых возможностей здесь не добавляем.
4. Коммит после каждого зелёного шага: `test: ...` → `feat: ...` → `refactor: ...`. История коммитов — твой аргумент на интервью.

## Домен

- **CLIENT** создаёт заявку: купить/продать `asset` за `quoteAsset`, объём `amount`.
- **EXECUTOR** (OTC-деск) имеет параметры: поддерживаемые активы, min/max объём. Откликается (Offer) курсом `rate`.
- Статусы заявки: `SEARCHING_EXECUTOR` («поиск исполнителя») → `IN_PROGRESS` → `COMPLETED` | `CANCELLED` (архив).
- Регистрация организации: ФГУП запрещены.

## Test list (бэклог)

Отмечай `[x]` по мере прохождения. Порядок — от чистого домена к HTTP: сначала быстрые unit-тесты без моков, потом сервис с test doubles, потом интеграция.

### Этап 1 — домен, чистые функции (`src/domain`)

- [ ] 1. `createRequest`: статус `SEARCHING_EXECUTOR`, привязка к клиенту ← **уже написан, RED**
- [ ] 2. `amount <= 0` → `DomainError('AMOUNT_NOT_POSITIVE')`
- [ ] 3. `asset === quoteAsset` → `DomainError('SAME_ASSETS')`
- [ ] 4. `makeOffer`: исполнитель откликается на заявку в `SEARCHING_EXECUTOR` → Offer `PENDING`
- [ ] 5. отклик на заявку не в `SEARCHING_EXECUTOR` → `REQUEST_NOT_OPEN`
- [ ] 6. актив заявки не в `supportedAssets` исполнителя → `ASSET_NOT_SUPPORTED`
- [ ] 7. `amount` вне `[minAmount, maxAmount]` → `AMOUNT_OUT_OF_RANGE` (проверь границы: min и max включительно — boundary tests)
- [ ] 8. `rate <= 0` → `RATE_NOT_POSITIVE`
- [ ] 9. `acceptOffer`: заявка → `IN_PROGRESS`, выбранный offer → `ACCEPTED`, остальные → `REJECTED`
- [ ] 10. принять offer может только владелец заявки → `FORBIDDEN`
- [ ] 11. `cancelRequest`: из `SEARCHING_EXECUTOR` можно, из `COMPLETED` нельзя → `INVALID_TRANSITION`
- [ ] 12. `isArchived(request)` для `COMPLETED`/`CANCELLED` (подумай про `it.each`)
- [ ] 13. `validateOrganization`: тип `FGUP` → `STATE_ENTERPRISE_NOT_ALLOWED`

### Этап 2 — сервисный слой + test doubles (`src/services`)

- [ ] 14. `RequestService.create` сохраняет заявку через `RequestRepository` (используй **fake** — `InMemoryRequestRepository`)
- [ ] 15. id и текущее время приходят из инжектируемых `IdGenerator` и `Clock` (**stub**) — тесты детерминированы
- [ ] 16. после создания заявки вызывается `Notifier.notifyExecutors(...)` (**spy/mock** через `vi.fn()`) — только тем исполнителям, чьи параметры подходят
- [ ] 17. `listActive(user)`: CLIENT видит свои активные, EXECUTOR — открытые, подходящие под его параметры
- [ ] 18. `listArchive(client)`

### Этап 3 — HTTP, интеграционные тесты через supertest (`src/http`)

- [ ] 19. `createApp(deps)` — фабрика, зависимости передаются снаружи (так тесты не трогают реальную БД)
- [ ] 20. `POST /requests` → 201 + тело заявки
- [ ] 21. невалидное тело → 400 (`CreateRequestBodySchema` из `@otc/contracts`), формат ошибки единый
- [ ] 22. без токена → 401; EXECUTOR создаёт заявку → 403 (auth-middleware, токен пока фейковый `Bearer <userId>`)
- [ ] 23. `DomainError` маппится в 409/422 в error-middleware
- [ ] 24. `POST /requests/:id/offers`, `POST /offers/:id/accept`
- [ ] 25. `GET /requests?scope=active|archive`

### Этап 4 — по желанию

- [ ] Contract tests для репозитория: один набор тестов прогоняется и на InMemory, и на Postgres-реализации (Testcontainers)
- [ ] Подключить `apps/web` к API, типизируя ответы через `OtcRequestDto` из контрактов (тогда можно потренировать RTL + MSW на компонентах)

## Что говорить на интервью по этому проекту

- Почему порядок «домен → сервис → HTTP» (быстрая обратная связь, пирамида тестирования).
- Fake vs stub vs mock на примере Repository / Clock / Notifier.
- Почему `createApp(deps)` — dependency injection ради тестируемости.
- Где TDD помог: какой тест заставил поменять дизайн (запиши такие моменты сразу, пока помнишь).
