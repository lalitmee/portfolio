import Head from 'next/head';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import Footer from './Footer';
import Navigation from './Navigation';

const siteUrl = 'https://www.lalitmee.com';

export default function SiteLayout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const mainRef = useRef<HTMLElement>(null);
  const previousPath = useRef(router.asPath);
  const path = router.asPath.split(/[?#]/, 1)[0] || '/';
  const canonicalPath = path.endsWith('/') ? path : `${path}/`;
  const canonicalUrl = `${siteUrl}${canonicalPath}`;

  useEffect(() => {
    if (previousPath.current !== router.asPath) {
      previousPath.current = router.asPath;
      mainRef.current?.focus({ preventScroll: true });
    }
  }, [router.asPath]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content="Lalit Kumar" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={`${siteUrl}/images/profile_v3.png`}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="site-page">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navigation />
        <main id="main-content" ref={mainRef} tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
