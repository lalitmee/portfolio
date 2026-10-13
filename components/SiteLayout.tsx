import Head from 'next/head';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

export default function SiteLayout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}): React.ReactElement {
  const { asPath } = useRouter();
  const path = asPath.split(/[?#]/)[0] || '/';
  const canonical = `https://www.lalitmee.com${path}`;

  return (
    <>
      <Head>
        <title>{title} | Lalit Kumar</title>
        <meta name="description" content={description} />
        <meta name="author" content="Lalit Kumar" />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={`${title} | Lalit Kumar`} />
        <meta property="og:description" content={description} />
      </Head>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navigation />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <Footer />
    </>
  );
}
