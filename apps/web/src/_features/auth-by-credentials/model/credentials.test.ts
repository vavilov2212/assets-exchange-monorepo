import { validateCredentials } from "./credentials";


const base = { email: "user@example.com", password: "secret" };

/**
 * --- Test cases ---
 * 
 */
describe('credentials model', () => {

    it('Does not return errors when given correct values', () => {
        const result = validateCredentials(base);

        expect(result).toEqual({});
    })

    it('Shows error message for email without @', () => {
        const result = validateCredentials({...base, email: 'user.email.com'});

        expect(result).toEqual({email: 'Введите корректный email'})
    })
    it('Shows error message for empty password', () => {
        const result = validateCredentials({...base, password: ''});

        expect(result).toEqual({password: 'Введите пароль'})
    })
})