import type { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ExternalLinkIcon,
  GithubIcon,
  BulbIcon,
  WidgetsIcon,
  SlidersIcon,
  ConstructionIcon,
} from '../../components/icons/AnimatedIcons';
import SiteLayout from '../../components/SiteLayout';
import DirectionalArrow from '../../components/DirectionalArrow';
import { apps, getApp, type App } from '../../data/apps';
import { trackEvent } from '../../utils/analytics';

export default function AppDetail({ app }: { app: App }) {
  const introActions = useRef<HTMLElement>(null);
  const [showDock, setShowDock] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const syncDock = () => {
      setShowDock(
        (introActions.current?.getBoundingClientRect().bottom ?? 0) < 0,
      );
    };
    syncDock();
    window.addEventListener('scroll', syncDock, { passive: true });
    window.addEventListener('resize', syncDock);
    return () => {
      window.removeEventListener('scroll', syncDock);
      window.removeEventListener('resize', syncDock);
    };
  }, [app.slug]);

  const actions = (
    <>
      <a
        className="button button-outline section-button"
        aria-label="Open app"
        href={app.liveUrl}
        target="_blank"
        rel="noreferrer"
        onPointerEnter={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          event.currentTarget.style.setProperty(
            '--reveal-x',
            `${event.clientX - bounds.left + 1}px`,
          );
          event.currentTarget.style.setProperty(
            '--reveal-y',
            `${event.clientY - bounds.top + 1}px`,
          );
        }}
        onClick={() => trackEvent({ event: 'app_launch', app_slug: app.slug })}
      >
        <ExternalLinkIcon aria-hidden="true" />{' '}
        <span className="app-action-label">Open app</span>
        <span className="section-button-fill" aria-hidden="true">
          <ExternalLinkIcon aria-hidden="true" />{' '}
          <span className="app-action-label">Open app</span>
        </span>
      </a>
      <a
        className="text-link"
        aria-label="View source"
        href={app.sourceUrl}
        target="_blank"
        rel="noreferrer"
      >
        <GithubIcon aria-hidden="true" />{' '}
        <span className="app-action-label">View source</span>
      </a>
    </>
  );
  return (
    <SiteLayout
      title={`${app.name} | Apps | Lalit Kumar`}
      description={app.description}
    >
      <article className="page-width content-page case-detail">
        <Link className="text-link" href="/apps/">
          <DirectionalArrow direction="back" /> All apps
        </Link>
        <p className="eyebrow">
          App <span>·</span> Actively evolving
        </p>
        <h1>{app.name}</h1>
        <p className="page-lede">{app.description}</p>
        <nav
          ref={introActions}
          className="detail-actions app-detail-actions"
          aria-label="App links"
        >
          {actions}
        </nav>
        <Image
          className="app-detail-preview"
          {...app.screenshot}
          sizes="(max-width: 760px) 90vw, 1100px"
          priority
        />
        {app.motivation && (
          <section>
            <h2 className="app-section-heading">
              <BulbIcon aria-hidden="true" /> Why I built it
            </h2>
            {app.motivation.split('\n\n').map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        )}
        {app.capabilities.length > 0 && (
          <section>
            <h2 className="app-section-heading">
              <WidgetsIcon aria-hidden="true" /> What it does
            </h2>
            <ul>
              {app.capabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}
        {app.decisions.length > 0 && (
          <section>
            <h2 className="app-section-heading">
              <SlidersIcon aria-hidden="true" /> Decisions and boundaries
            </h2>
            <ul>
              {app.decisions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}
        <section>
          <h2 className="app-section-heading">
            <ConstructionIcon aria-hidden="true" /> Still taking shape
          </h2>
          <p>
            This is an ongoing project. I’ll keep expanding and refining it as I
            use it, discover new needs, and find better ways to solve the
            problem.
          </p>
        </section>
      </article>
      <AnimatePresence>
        {showDock && (
          <motion.nav
            className="app-action-dock"
            aria-label={`${app.name} quick links`}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          >
            <span className="app-dock-caption">
              {app.name}
              <span>Try it for yourself</span>
            </span>
            <div className="app-dock-links">{actions}</div>
          </motion.nav>
        )}
      </AnimatePresence>
    </SiteLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: apps.map((app) => ({ params: { slug: app.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const app = getApp(params?.slug);
  return app ? { props: { app } } : { notFound: true };
};
