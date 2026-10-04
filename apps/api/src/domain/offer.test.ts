import { makeOffer, type MakeOfferInput } from './offer';
import type { Executor, OtcRequest } from './types';

const request: OtcRequest = {
  id: 'req-1',
  clientId: 'client-1',
  side: 'BUY',
  asset: 'USDT',
  quoteAsset: 'RUB',
  amount: 10_000,
  status: 'SEARCHING_EXECUTOR',
  createdAt: new Date('2026-10-03T12:00:00Z'),
};

const executor: Executor = {
  id: 'exec-1',
  role: 'EXECUTOR',
  supportedAssets: ['USDT', 'BTC'],
  minAmount: 1_000,
  maxAmount: 100_000,
};

function validInput(overrides: Partial<MakeOfferInput> = {}): MakeOfferInput {
  return { id: 'offer-1', request, executor, rate: 92.5, ...overrides };
}

describe('makeOffer', () => {
  // ЦИКЛ 4 — RED
  it('создаёт отклик PENDING от исполнителя на открытую заявку', () => {
    expect(makeOffer(validInput())).toEqual({
      id: 'offer-1',
      requestId: 'req-1',
      executorId: 'exec-1',
      rate: 92.5,
      status: 'PENDING',
    });
  });

  // Следующие — пишешь сам, по одному, строго начиная с RED.
  it.todo(
    'REQUEST_NOT_OPEN, если заявка не в SEARCHING_EXECUTOR (подумай про it.each по статусам)'
  );
  it.todo('ASSET_NOT_SUPPORTED, если asset заявки не в supportedAssets исполнителя');
  it.todo(
    'AMOUNT_OUT_OF_RANGE, если amount вне [minAmount, maxAmount] — проверь min-1, min, max, max+1'
  );
  it.todo('RATE_NOT_POSITIVE, если rate <= 0');
});
