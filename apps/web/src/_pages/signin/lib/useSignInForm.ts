import { LoginBody } from '@assets-exchange-monorepo/contracts';
import { CredentialsFormValues, toLoginBody, validateCredentials } from '@features/auth-by-credentials/model/credentials';
import { SignInResult } from '@features/auth-by-credentials/model/ports';
import { useForm } from '@mantine/form';

export const useSignInForm = (onSubmit: (body: LoginBody) => Promise<SignInResult>) => {
  const form = useForm<CredentialsFormValues>({
    initialValues: { email: '', password: '', keepMeSignedIn: false },
    validate: validateCredentials,
    validateInputOnBlur: true,
  });
  return { form, handleSubmit: form.onSubmit((values) => onSubmit(toLoginBody(values))) };
};
