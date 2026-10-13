import Head from 'next/head';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import Footer from './Footer';
import Navigation from './Navigation';

interface SiteLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

const canonicalOrigin = 'https://www.lalitmee.com';

export function SiteLayout({ title, description, children }: SiteLayoutProps) {
  const { asPath } = useRouter();
  const path = asPath.split(/[?#]/, 1)[0] || '/';

  return (
    <>
      <Head>
        <title>{title} | Lalit Kumar</title>
        <meta name="description" content={description} />
        <meta name="author" content="Lalit Kumar" />
        <link rel="canonical" href={`${canonicalOrigin}${path}`} />
      </Head>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="site-frame">
        <Navigation />
        <div className="site-content">
          <main className="site-main" id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
