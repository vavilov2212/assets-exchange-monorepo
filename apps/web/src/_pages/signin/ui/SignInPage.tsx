import { SignInForm } from '@features/auth-by-credentials';
import { colors, EColors, ESpacing, spacing } from '../../../styles/vars';
import { ETextVariant, ETitleSize, Stack, Text, Title } from '@assets-exchange-monorepo/ui-lib';
import { Anchor, Group, Paper } from '@mantine/core';
import Link from 'next/link';

interface TSignInProps {
    variant: string;
}

const SignInPage = (props: TSignInProps) => {

  return (
    <Paper
      m="0 auto"
      maw="authWrapperForm"
      p={{
        base: `${spacing[ESpacing['3XL']]} ${spacing[ESpacing.XL]}`,
        xs: `${spacing[ESpacing['4XL']]}`,
      }}
    >
      <Stack gap={spacing[ESpacing['3XL']]}>
        <Stack
          gap={{
            xs: spacing[ESpacing.M],
            base: spacing[ESpacing.S],
          }}
        >
          <Title
            ta="center"
            order={1}
            size={{
              base: ETitleSize.H6,
              xs: ETitleSize.H3,
              md: ETitleSize.H2,
              xl: ETitleSize.H1,
            }}
          >
            {'header'}
            {/* {loginModalT('header')} */}
          </Title>
          <Text
            variant={{
              base: ETextVariant.MOBILE_SUBTITLE_2,
              xs: ETextVariant.SUBTITLE_2,
            }}
            ta="center"
            c={colors[EColors.BLACK][8]}
          >
            {'text'}
          </Text>
        </Stack>
        <Stack gap={spacing[ESpacing['2XL']]}>
            <SignInForm variant={props.variant} />

            <Group gap={spacing[ESpacing.S]} justify="center">
              <Text
                variant={{
                  base: ETextVariant.P_MOBILE,
                  xs: ETextVariant.P,
                }}
                w={{
                  base: '100%',
                  xs: 'auto',
                }}
                ta="center"
              >
                {'dontHaveAccount'}
              </Text>
              <Anchor component={Link} href={'/signup'}>
                <Text
                  variant={{
                    base: ETextVariant.P_SEMI_MOBILE,
                    xs: ETextVariant.P_MEDIUM,
                  }}
                  inherit
                >
                  {'signUp'}
                </Text>
              </Anchor>
            </Group>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default SignInPage;
