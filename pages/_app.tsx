import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { Outfit } from 'next/font/google';
import AnalyticsConsent from '../components/AnalyticsConsent';
import '../styles/globals.css';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <div className={`${outfit.variable} font-sans`}>
          <Component {...pageProps} />
          <AnalyticsConsent />
        </div>
    </ThemeProvider>
  );
}
