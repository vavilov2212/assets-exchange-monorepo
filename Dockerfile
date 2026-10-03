# Сборка apps/web из монорепо. turbo prune оставляет только @otc/web и его
# внутренние зависимости (@otc/contracts) + урезанный package-lock.json.
FROM dockreg.ofbox.ru/devops/node:20.11 AS base
RUN apk add --no-cache libc6-compat

# 1. Prune: вырезаем из монорепо только то, что нужно web
FROM base AS pruner
WORKDIR /app
COPY . .
RUN npx --yes turbo@^2 prune @otc/web --docker

# 2. Install: сначала только package.json-ы и lock — слой кешируется, пока не менялись зависимости
FROM base AS builder
WORKDIR /app
COPY --from=pruner /app/out/json/ .
RUN npm ci
COPY --from=pruner /app/out/full/ .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npx turbo run build --filter=@otc/web

# 3. Runtime: только standalone-сборка Next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

EXPOSE 3000

CMD ["node", "apps/web/server.js"]
