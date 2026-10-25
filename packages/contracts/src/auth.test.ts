import { LoginBodySchema } from './auth';

describe('LoginBodySchema', () => {
    it('отклоняет email без "@"', () => {
        const result = LoginBodySchema.safeParse({ email: 'user.example.com', password: 'secret' });
        expect(result.success).toBe(false);
    });

    it('обрезает пробелы и приводит email к нижнему регистру', () => {
        const result = LoginBodySchema.safeParse({ email: '  User@Example.COM ', password: 'secret' });
        expect(result.success && result.data.email).toBe('user@example.com');
    });

});