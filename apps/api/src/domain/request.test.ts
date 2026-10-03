import { createRequest, type CreateRequestInput } from './request';
import { DomainError, type Client } from './types';
import { Asset } from '@otc/contracts';

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

function expectDomainError(fn: () => unknown, code: string) {
  expect(fn).toThrow(DomainError);
  expect(fn).toThrow(expect.objectContaining({code}))
}

describe('createRequest', () => {
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

  it('бросает DomainError AMOUNT_NOT_POSITIVE, если amount <= 0', () => {
    expectDomainError(
      () => createRequest(validInput({amount: -10})),
      'AMOUNT_NOT_POSITIVE'
    );

  });

  it('бросает DomainError SAME_ASSETS, если asset === quoteAsset', () => {
    const validInputOverrides = {asset: Asset.USD, quoteAsset: Asset.USD};
    expectDomainError(
      () => createRequest(validInput(validInputOverrides)),
      'SAME_ASSETS'
    );
  });
});
