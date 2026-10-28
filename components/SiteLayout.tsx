import Head from 'next/head';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import Footer from './Footer';
import { animateArrows } from '../utils/arrowAnimation';

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
  const path = router.asPath.split(/[?#]/, 1)[0] || '/';
  const canonicalPath = path.endsWith('/') ? path : `${path}/`;
  const canonicalUrl = `${siteUrl}${canonicalPath}`;

  function animateInteractiveArrows(target: EventTarget | null) {
    if (!(target instanceof Element)) return;

    const link = target.closest('a, button');
    if (link) animateArrows(link);
  }

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
        <main
          id="main-content"
          tabIndex={-1}
          onPointerOver={(event) => {
            if (
              !window.matchMedia('(hover: hover) and (pointer: fine)').matches
            )
              return;
            if (
              event.relatedTarget instanceof Node &&
              event.target instanceof Element &&
              event.target.closest('a, button')?.contains(event.relatedTarget)
            ) {
              return;
            }
            animateInteractiveArrows(event.target);
          }}
          onFocus={(event) => {
            if (event.target.matches(':focus-visible')) {
              animateInteractiveArrows(event.target);
            }
          }}
        >
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
