import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { Outfit } from 'next/font/google';
import Head from 'next/head';
import '../styles/globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

export default function App({ Component, pageProps }: AppProps) {
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
      <ThemeProvider attribute="class" defaultTheme="dark">
        <main className={`${outfit.variable} font-sans`}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </>
  );
}
