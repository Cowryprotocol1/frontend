import type { NextPage } from 'next';
import { AppProps } from 'next/app';
import React from 'react';

import '@/styles/globals.css';
import '@/styles/other.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import { UserProvider } from '@/store/user';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */
export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  // return <Component {...pageProps} />;
  return getLayout(
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
  );
}

export default MyApp;
