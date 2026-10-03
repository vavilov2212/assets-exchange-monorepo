import { createRequest, type CreateRequestInput } from './request';
import type { Client } from './types';

// Test builder: тест описывает только то, что для него важно,
// остальное — валидные значения по умолчанию.
const client: Client = { id: 'client-1', role: 'CLIENT', organizationId: 'org-1' };
const NOW = new Date('2026-10-03T12:00:00Z');

function validInput(overrides: Partial<CreateRequestInput> = {}): CreateRequestInput {
  return {
    id: 'req-1',
    client,
    side: 'BUY',
    asset: 'USDT',
    quoteAsset: 'RUB',
    amount: 10_000,
    now: NOW,
    ...overrides,
  };
}

describe('createRequest', () => {
  // ЦИКЛ 1 — RED (уже написан). Запусти `npm test`, убедись, что падает
  // именно с "Not implemented", потом сделай GREEN.
  it('создаёт заявку в статусе «поиск исполнителя», привязанную к клиенту', () => {
    const request = createRequest(validInput());

    expect(request).toEqual({
      id: 'req-1',
      clientId: 'client-1',
      side: 'BUY',
      asset: 'USDT',
      quoteAsset: 'RUB',
      amount: 10_000,
      status: 'SEARCHING_EXECUTOR',
      createdAt: NOW,
    });
  });

  // Список следующих тестов (test list по Кенту Беку).
  // Превращаем по одному `it.todo` в `it` — только после того, как предыдущий зелёный.
  it.todo('бросает DomainError AMOUNT_NOT_POSITIVE, если amount <= 0');
  it.todo('бросает DomainError SAME_ASSETS, если asset === quoteAsset');
});
