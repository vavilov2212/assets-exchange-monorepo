import { LoginBodySchema } from './auth';

describe('LoginBodySchema', () => {
  it('отклоняет email без "@"', () => {
    const result = LoginBodySchema.safeParse({ email: 'user.example.com', password: 'secret' });
    expect(result.success).toBe(false);
  });
});