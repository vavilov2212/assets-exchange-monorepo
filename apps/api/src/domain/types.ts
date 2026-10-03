// Доменная модель api. Перечисления (роли, активы, статусы) берём из общего пакета
// @otc/contracts — это единый источник правды для web и api.
// Сами сущности — доменные (Date вместо ISO-строк, параметры исполнителя и т.д.).
import type { Asset, OfferStatus, RequestSide, RequestStatus } from '@otc/contracts';
import { AssetSchema } from '@otc/contracts';

export type { Asset, OfferStatus, RequestSide, RequestStatus, Role } from '@otc/contracts';

export const SUPPORTED_ASSETS: readonly Asset[] = AssetSchema.options;

export interface Client {
  id: string;
  role: 'CLIENT';
  organizationId: string;
}

export interface Executor {
  id: string;
  role: 'EXECUTOR';
  // Параметры исполнителя: с какими активами и объёмами он работает
  supportedAssets: Asset[];
  minAmount: number;
  maxAmount: number;
}

export type User = Client | Executor;

export interface OtcRequest {
  id: string;
  clientId: string;
  side: RequestSide; // клиент хочет купить или продать asset
  asset: Asset; //      что покупаем/продаём
  quoteAsset: Asset; // за что
  amount: number;
  status: RequestStatus;
  createdAt: Date;
}

export interface Offer {
  id: string;
  requestId: string;
  executorId: string;
  rate: number;
  status: OfferStatus;
}

export class DomainError extends Error {
  constructor(
    public readonly code: string,
    message?: string
  ) {
    super(message ?? code);
    this.name = 'DomainError';
  }
}
