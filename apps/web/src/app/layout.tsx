// import '@mantine/core/styles.css';
// import '@mantine/notifications/styles.css';
// import '@/styles/global.css';
import React from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
// import { Notifications } from '@mantine/notifications';
import { aexCssVariablesResolver, aexTheme } from '../styles/theme';
// import { Providers } from '@/store/provider';
// import { Drawers, Modals } from '@/components';

export const metadata = {
  title: 'Assets Exchange',
  description: 'Assets Exchange is a platform for traders and buyers to exchange their assets.',
};

export default async function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={aexTheme} cssVariablesResolver={aexCssVariablesResolver}>
          {children}
        </MantineProvider>

        {/* <Providers>
          <MantineProvider theme={AExTheme} cssVariablesResolver={AExCssVariablesResolver}>
            {children}
            <Notifications />
            <Modals />
            <Drawers />
          </MantineProvider>
        </Providers> */}
      </body>
    </html>
  );
}
