import { CreateRequestBodySchema, Role } from './index';

describe('contracts', () => {
  it('Role — строковые значения, а не числовой enum', () => {
    expect(Role.CLIENT).toBe('CLIENT');
    expect(Role.EXECUTOR).toBe('EXECUTOR');
  });

  it('CreateRequestBody отклоняет неположительный amount', () => {
    const result = CreateRequestBodySchema.safeParse({
      side: 'BUY',
      asset: 'USDT',
      quoteAsset: 'RUB',
      amount: 0,
    });
    expect(result.success).toBe(false);
  });
});
