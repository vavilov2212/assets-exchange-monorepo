// import '@mantine/core/styles.css';
// import '@mantine/notifications/styles.css';
// import '@/styles/global.css';
import React from 'react';
// import { ColorSchemeScript, MantineProvider } from '@mantine/core';
// import { Notifications } from '@mantine/notifications';
// import { AExCssVariablesResolver, AExTheme } from '@/styles/theme';
// import { Providers } from '@/store/provider';
// import { Drawers, Modals } from '@/components';

export const metadata = {
  title: 'Portal',
  description: 'AEx admin service.',
};

// eslint-disable-next-line
export default async function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        {/* <ColorSchemeScript /> */}
      </head>
      <body>
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
