import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { Outfit } from 'next/font/google';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import AnalyticsConsent from '../components/AnalyticsConsent';
import '../styles/globals.css';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const previousPath = useRef(router.asPath);

  useEffect(() => {
    if (previousPath.current !== router.asPath) {
      previousPath.current = router.asPath;
      document.getElementById('main-content')?.focus({ preventScroll: true });
    }
  }, [router.asPath]);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <div className={`${outfit.variable} font-sans`}>
        <Component {...pageProps} />
        <AnalyticsConsent />
      </div>
    </ThemeProvider>
  );
}
