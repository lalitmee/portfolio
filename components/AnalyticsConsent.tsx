import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  loadAnalytics,
  normalizePagePath,
  readConsent,
  saveConsent,
  setAnalyticsConsent,
  trackEvent,
  type Consent,
} from '../utils/analytics';

export default function AnalyticsConsent(): React.ReactElement | null {
  const router = useRouter();
  const [choice, setChoice] = useState<Consent>('unknown');
  const initialViewSent = useRef(false);

  const choose = useCallback((next: Consent) => {
    if (typeof window === 'undefined') return;
    saveConsent({ setItem: (key, value) => window.localStorage.setItem(key, value) }, next);
    setAnalyticsConsent(next);
    setChoice(next);
    if (next === 'accepted') loadAnalytics();
  }, []);

  useEffect(() => {
    const stored = readConsent({ getItem: (key) => window.localStorage.getItem(key) });
    setChoice(stored);
    setAnalyticsConsent(stored);
    if (stored === 'accepted') loadAnalytics();
    const onChoice = (event: Event) => {
      const detail = (event as CustomEvent<Consent>).detail;
      const next = detail === 'accepted' || detail === 'declined' || detail === 'unknown'
        ? detail
        : readConsent({ getItem: (key) => window.localStorage.getItem(key) });
      setChoice(next);
      if (next === 'accepted') loadAnalytics();
    };
    window.addEventListener('portfolio-analytics-consent-change', onChoice);
    return () => window.removeEventListener('portfolio-analytics-consent-change', onChoice);
  }, []);

  useEffect(() => {
    const sendPageView = (route: string) => {
      const path = normalizePagePath(route);
      if (!trackEvent({ event: 'page_view', page_path: path })) return;
      initialViewSent.current = true;
      const caseMatch = path.match(/^\/work\/([^/]+)\/?$/);
      if (caseMatch) trackEvent({ event: 'case_study_view', case_slug: caseMatch[1] });
    };
    const onRouteChange = (route: string) => sendPageView(route);
    router.events.on('routeChangeComplete', onRouteChange);
    if (router.isReady && choice === 'accepted' && !initialViewSent.current) sendPageView(router.asPath);
    return () => router.events.off('routeChangeComplete', onRouteChange);
  }, [choice, router.asPath, router.events, router.isReady]);

  if (choice !== 'unknown') return null;
  return (
    <aside className="consent-banner" aria-label="Analytics preference">
      <p>Optional, privacy-focused analytics help me understand which pages are useful. No ads; your choice is saved on this device.</p>
      <div className="consent-actions">
        <button type="button" className="button button-primary" onClick={() => choose('accepted')}>Accept analytics</button>
        <button type="button" className="button button-secondary" onClick={() => choose('declined')}>Decline</button>
        <Link href="/privacy/">Privacy details</Link>
      </div>
    </aside>
  );
}
