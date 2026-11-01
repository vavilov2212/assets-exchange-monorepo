import { LoginBody } from '@assets-exchange-monorepo/contracts';
import { useForm } from '@mantine/form';
import { type CredentialsFormValues, toLoginBody, validateCredentials } from './credentials';
import type { SignInResult } from './ports';

export const useSignInForm = (onSubmit: (body: LoginBody) => Promise<SignInResult>) => {
  const form = useForm<CredentialsFormValues>({
    initialValues: { email: '', password: '', keepMeSignedIn: false },
    validate: validateCredentials,
    validateInputOnBlur: true,
  });
  return { form, handleSubmit: form.onSubmit((values) => onSubmit(toLoginBody(values))) };
};
