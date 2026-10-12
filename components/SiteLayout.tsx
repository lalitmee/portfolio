import Head from 'next/head';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
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
  const shouldReduceMotion = useReducedMotion();
  const path = router.asPath.split(/[?#]/, 1)[0] || '/';
  const canonicalPath = path.endsWith('/') ? path : `${path}/`;
  const canonicalUrl = `${siteUrl}${canonicalPath}`;

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
        <main id="main-content" tabIndex={-1}>
          <motion.div
            key={path}
            initial={{
              opacity: shouldReduceMotion ? 1 : 0,
              y: shouldReduceMotion ? 0 : 8,
            }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.18,
              ease: 'easeOut',
            }}
          >
            {children}
          </motion.div>
        </main>
        <Footer />
      </div>
    </>
  );
}
