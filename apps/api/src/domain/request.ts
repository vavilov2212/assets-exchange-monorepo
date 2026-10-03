import { type Client, type OtcRequest, type RequestSide, type Asset, DomainError } from './types';
import { RequestStatus } from '@otc/contracts';

export interface CreateRequestInput {
  id: string;
  client: Client;
  side: RequestSide;
  asset: Asset;
  quoteAsset: Asset;
  amount: number;
  now: Date;
}

export function createRequest(input: CreateRequestInput): OtcRequest {
  if (input.asset === input.quoteAsset) throw new DomainError('SAME_ASSETS');
  if (input.amount <= 0) throw new DomainError('AMOUNT_NOT_POSITIVE');
  
  return {
    id: input.id,
    clientId: input.client.id,
    side: input.side,
    asset: input.asset,
    quoteAsset: input.quoteAsset,
    amount: input.amount,
    status: RequestStatus.SEARCHING_EXECUTOR,
    createdAt: input.now
  }
}
