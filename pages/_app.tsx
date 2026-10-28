import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import {
  Cormorant_Garamond,
  DM_Serif_Display,
  Geist,
  IBM_Plex_Sans,
  Inter,
  Libre_Baskerville,
  Lora,
  Manrope,
  Outfit,
  Playfair_Display,
} from 'next/font/google';
import AnalyticsConsent from '../components/AnalyticsConsent';
import AmbientGlow from '../components/AmbientGlow';
import BackToTop from '../components/BackToTop';
import Navigation from '../components/Navigation';
import PageTransition from '../components/PageTransition';
import {
  setTextLinkRevealOrigin,
  setUnderlineOrigin,
} from '../utils/textLinkReveal';
import '../styles/globals.css';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  preload: false,
});
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  preload: false,
});
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  preload: false,
});
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  preload: false,
});
const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-dm-serif-display',
  preload: false,
});
const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  preload: false,
});
const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-libre-baskerville',
  preload: false,
});
const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant-garamond',
  preload: false,
});
const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  preload: false,
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.documentElement.classList.add(
      outfit.variable,
      inter.variable,
      geist.variable,
      ibmPlexSans.variable,
      playfairDisplay.variable,
      dmSerifDisplay.variable,
      lora.variable,
      libreBaskerville.variable,
      cormorantGaramond.variable,
      manrope.variable,
    );
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div
        className={`${outfit.variable} ${inter.variable} ${geist.variable} ${ibmPlexSans.variable} ${playfairDisplay.variable} ${dmSerifDisplay.variable} ${lora.variable} ${libreBaskerville.variable} ${cormorantGaramond.variable} ${manrope.variable} font-sans`}
        onPointerOver={(event) => {
          setTextLinkRevealOrigin(event);
          setUnderlineOrigin(event);
        }}
        onPointerOut={setUnderlineOrigin}
      >
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <AmbientGlow />
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
