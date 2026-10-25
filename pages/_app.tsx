import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { Outfit } from 'next/font/google';
import AnalyticsConsent from '../components/AnalyticsConsent';
import BackToTop from '../components/BackToTop';
import Navigation from '../components/Navigation';
import PageTransition from '../components/PageTransition';
import {
  setTextLinkRevealOrigin,
  setUnderlineOrigin,
} from '../utils/textLinkReveal';
import '../styles/globals.css';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <div
        className={`${outfit.variable} font-sans`}
        onPointerOver={(event) => {
          setTextLinkRevealOrigin(event);
          setUnderlineOrigin(event);
        }}
        onPointerOut={setUnderlineOrigin}
      >
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navigation />
        <PageTransition>
          <Component {...pageProps} />
        </PageTransition>
        <BackToTop />
        <AnalyticsConsent />
      </div>
    </ThemeProvider>
  );
}
