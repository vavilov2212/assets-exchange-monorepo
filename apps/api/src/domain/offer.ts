import type { Executor, Offer, AExRequest } from './types';

export interface MakeOfferInput {
  id: string;
  request: AExRequest;
  executor: Executor;
  rate: number;
}

// GREEN — твой.
export function makeOffer(_input: MakeOfferInput): Offer {
  throw new Error('Not implemented');
}
