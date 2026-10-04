import type { Executor, Offer, OtcRequest } from './types';

export interface MakeOfferInput {
  id: string;
  request: OtcRequest;
  executor: Executor;
  rate: number;
}

// GREEN — твой.
export function makeOffer(_input: MakeOfferInput): Offer {
  throw new Error('Not implemented');
}
