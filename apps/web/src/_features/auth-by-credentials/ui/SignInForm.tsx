'use client';

import { FC, RefObject, useEffect, useRef, useState } from 'react';
import { env, reloadAndAwaitLoad, trimStringsInObject } from '@assets-exchange-monorepo/shared-lib';
import { ESpacing, spacing } from '@assets-exchange-monorepo/style-variables';
import { Stack } from '@assets-exchange-monorepo/ui-lib';
import { z } from 'zod';
import { Button, Input } from '@mantine/core';
import { zodResolver } from '@mantine/form';
import { createFormContext } from '@mantine/form';

export interface ILoginRequestData {
  email: string;
  password: string;
  rememberMe?: boolean;
  code2FA?: string;
  captcha?: string;
  check2FACode: boolean;
}

const SignInForm = () => {

    const [useSignInForm] = createFormContext<Pick<ILoginRequestData, 'email' | 'password' | 'rememberMe' | 'captcha'>>();

    const formSchema = z.object({
        email: stringValidate().email({ message: ' ' }),
        password: stringValidate(),
        captcha: isCaptchaRequired ? stringValidate() : z.any(),
    });

  const form = useSignInForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: zodResolver(formSchema),
    onValuesChange: () => {
      if (form.errors.email && form.errors.password && form.errors.email === form.errors.password) {
        form.clearFieldError('email');
        form.clearFieldError('password');
      }
    },
    validateInputOnBlur: true,
    transformValues: (values) =>
      trimStringsInObject({
        ...values,
        email: values.email.toLowerCase(),
        captcha: isCaptchaRequired ? values.captcha : undefined,
      }),
    enhanceGetInputProps: () => ({
      disabled: checkAccountExistence.isPending,
    }),
    clearInputErrorOnChange: false,
  });

  useEffect(() => {
    const search = window?.location?.search?.replace(/\+/g, '%2B');
    const params = new URLSearchParams(search);

    form.setFieldValue('email', params.get('email') || '');
  }, []);

  return (
    <form
        onSubmit={form.onSubmit((values) => {
            checkAccountExistence.mutate({
            ...values,
            axiosInstance: variant,
            });
        })}
    >
    <Stack gap={spacing[ESpacing['3XL']]}>
      <Stack
        gap={{
          base: spacing[ESpacing.XL],
          xs: spacing[ESpacing['3XL']],
        }}
      >
        <TextInput
          type="email"
          inputMode="email"
          label={commonT('email')}
          placeholder={loginModalT('loginInSystem')}
          {...transformEmailOnChange(form.getInputProps('email'))}
          onBlur={(e) => {
            e.preventDefault();
            form.getInputProps('email').onBlur(e);

            mutateIsCaptchaRequiredWithValidation();
          }}
        />
        <PasswordInput
          label={commonT('password')}
          placeholder={commonT('password')}
          maxLength={16}
          {...form.getInputProps('password')}
        />
      </Stack>
        <Stack gap={spacing[ESpacing.S]}>
        <Button
            type="submit"
            fullWidth
            disabled={!form.isValid() || checkAccountExistence.isPending}
        >
            {commonT('buttonNext')}
        </Button>
        {form.errors.captcha && <Input.Wrapper error={form.errors.captcha} />}
        </Stack>
    </Stack>
    </form>
  );
};

export default SignInForm;
