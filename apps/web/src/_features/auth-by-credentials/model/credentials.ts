import { LoginBodySchema, type LoginBody, type LoginBodyInput } from '@assets-exchange-monorepo/contracts';

export type CredentialsFormValues = LoginBodyInput;

const ERROR_MESSAGES: Record<string, Record<string, string>> = {
  email: { invalid_string: 'Введите корректный email', too_small: 'Введите email', too_big: 'Email слишком длинный' },
  password: { too_small: 'Введите пароль', too_big: 'Пароль слишком длинный' },
};

export const validateCredentials = (values: CredentialsFormValues): Record<string, string> => {
  const result = LoginBodySchema.safeParse(values);

  if (result.success) return {};

  const errors: Record<string, string> = {};

  for (const issue of result.error.issues) {
    const field = String(issue.path[0]);
    errors[field] ??= ERROR_MESSAGES[field]?.[issue.code] ?? 'Некорректное значение';
  }

  return errors;
};

export const toLoginBody = (values: CredentialsFormValues): LoginBody => LoginBodySchema.parse(values);