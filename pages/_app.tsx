import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { Outfit } from 'next/font/google';
import Head from 'next/head';
import { useEffect } from 'react';
import '../styles/globals.css';

function FaviconUpdater() {
  useEffect(() => {
    const updateFavicon = () => {
      const theme =
        document.documentElement.getAttribute('data-theme') || 'default';
      const link = document.querySelector(
        "link[rel~='icon']",
      ) as HTMLLinkElement;
      if (link) {
        link.href = `/favicon-${theme}.svg`;
      } else {
        const newLink = document.createElement('link');
        newLink.rel = 'icon';
        newLink.href = `/favicon-${theme}.svg`;
        document.head.appendChild(newLink);
      }
    };

    // Initial update
    updateFavicon();

    // Observer for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-theme'
        ) {
          updateFavicon();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return null;
}

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Apply font to body to ensure Portals (like BottomSheet) inherit it
    document.body.classList.add(outfit.variable, 'font-sans');
    return () => {
      document.body.classList.remove(outfit.variable, 'font-sans');
    };
  }, []);

  return (
    <>
      <Head>
        <title>Lalit Kumar - Senior Software Engineer</title>
        <meta
          name="description"
          content="Portfolio of Lalit Kumar, a Senior Software Engineer with 7+ years of experience in Frontend, Backend, DevOps, and Digital Marketing."
        />
        <meta
          name="keywords"
          content="Software Engineer, Frontend, Backend, DevOps, AWS, Google Cloud, Docker, Digital Marketing, SEO, React, Next.js"
        />
        <meta name="author" content="Lalit Kumar" />
        <meta
          property="og:title"
          content="Lalit Kumar - Senior Software Engineer"
        />
        <meta
          property="og:description"
          content="Portfolio showcasing expertise in Frontend, Backend, DevOps, and Digital Marketing."
        />
        <meta property="og:image" content="/images/my-image.jpeg" />
        <meta
          property="og:url"
          content="https://lalitmee.github.io/portfolio"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://lalitmee.github.io/portfolio" />
      </Head>
      {/* <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
        `}
      </Script>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM_CONTAINER_ID');
        `}
      </Script> */}
      <FaviconUpdater />
      <ThemeProvider attribute="class" defaultTheme="dark">
        <main className={`${outfit.variable} font-sans`}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </>
  );
}
