import type { Client, OtcRequest, RequestSide, Asset } from './types';

export interface CreateRequestInput {
  id: string;
  client: Client;
  side: RequestSide;
  asset: Asset;
  quoteAsset: Asset;
  amount: number;
  now: Date;
}

// GREEN-шаг — твой. Напиши минимум кода, чтобы тест прошёл, не больше.
export function createRequest(_input: CreateRequestInput): OtcRequest {
  throw new Error('Not implemented');
}
