import { LoginBodySchema } from "./auth";

describe("LoginBodySchema", () => {
  const base = { email: "user@example.com", password: "secret" };

  it('отклоняет email без "@"', () => {
    const result = LoginBodySchema.safeParse({
      email: "user.example.com",
      password: base.password,
    });
    expect(result.success).toBe(false);
  });

  it("обрезает пробелы и приводит email к нижнему регистру", () => {
    const result = LoginBodySchema.safeParse({
      email: "  User@Example.COM ",
      password: base.password,
    });
    expect(result.success && result.data.email).toBe("user@example.com");
  });

  it("отклоняет email длиннее 254 символов", () => {
    const email = `${"a".repeat(250)}@b.co`;
    expect(LoginBodySchema.safeParse({ ...base, email }).success).toBe(false);
  });

  it("принимает email длиной ровно 254 символа", () => {
    const email = `${"a".repeat(249)}@b.co`;
    expect(LoginBodySchema.safeParse({ ...base, email }).success).toBe(true);
  });

  it("отклоняет пустой пароль", () => {
    const result = LoginBodySchema.safeParse({
      email: "user@example.com",
      password: "",
    });
    expect(result.success).toBe(false);
  });

  it("принимает пароль длиной ровно 128 символов", () => {
    expect(
      LoginBodySchema.safeParse({ ...base, password: "a".repeat(128) }).success,
    ).toBe(true);
  });

  it("отклоняет пароль длиной 129 символов", () => {
    expect(
      LoginBodySchema.safeParse({ ...base, password: "a".repeat(129) }).success,
    ).toBe(false);
  });

  it("не запоминает авторизационную сессию по умолчанию", () => {
    const result = LoginBodySchema.parse(base);
    expect(result.keepMeSignedIn).toBe(false);
  });

  it("запоминает авторизационную сессию, если параметр keepMeSignedIn передан", () => {
    const result = LoginBodySchema.parse({ ...base, keepMeSignedIn: true });
    expect(result.keepMeSignedIn).toBe(true);
  });

  it("отклоняет значения не типа boolean", () => {
    expect(
      LoginBodySchema.safeParse({ ...base, keepMeSignedIn: "yes" }).success,
    ).toBe(false);
    expect(
      LoginBodySchema.safeParse({ ...base, keepMeSignedIn: null }).success,
    ).toBe(false);
  });
});
