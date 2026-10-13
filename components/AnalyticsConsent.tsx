import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  CONSENT_CHANGE_EVENT,
  Consent,
  getAnalyticsConfig,
  getAnalyticsConsent,
  normalizePagePath,
  readConsent,
  revokeAnalyticsConsent,
  saveConsent,
  setAnalyticsConsent,
  trackEvent,
} from '../utils/analytics';

function storage() {
  return {
    getItem: (key: string) => window.localStorage.getItem(key),
    setItem: (key: string, value: string) =>
      window.localStorage.setItem(key, value),
  };
}

function choose(choice: Exclude<Consent, 'unknown'>): boolean {
  const saved = saveConsent(storage(), choice);
  if (choice === 'declined') revokeAnalyticsConsent();
  else setAnalyticsConsent(choice);
  return saved;
}

function loadGtm(): void {
  const config = getAnalyticsConfig();
  if (!config) return;

  const browserWindow = window as Window & { dataLayer?: unknown[] };
  const dataLayer = Array.isArray(browserWindow.dataLayer)
    ? browserWindow.dataLayer
    : [];
  browserWindow.dataLayer = dataLayer;
  dataLayer.push([
    'consent',
    'update',
    {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    },
  ]);

  if (document.querySelector('script[data-precision-console-gtm]')) return;
  dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const script = document.createElement('script');
  script.async = true;
  script.dataset.precisionConsoleGtm = config.gtmId;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(config.gtmId)}`;
  document.head.appendChild(script);
}

function trackPage(path: string, lastPage: { current: string | null }): void {
  const pagePath = normalizePagePath(path);
  if (lastPage.current === pagePath) return;
  lastPage.current = pagePath;
  trackEvent({ event: 'page_view', page_path: pagePath });
  const caseMatch = pagePath.match(/^\/work\/([a-z0-9-]+)\/$/);
  if (caseMatch)
    trackEvent({ event: 'case_study_view', case_slug: caseMatch[1] });
}

export function AnalyticsSettings() {
  const [status, setStatus] = useState('');
  const [choice, setChoice] = useState<Consent>('unknown');

  useEffect(() => {
    setChoice(readConsent(storage()));
    const onConsentChange = () => setChoice(getAnalyticsConsent());
    window.addEventListener(CONSENT_CHANGE_EVENT, onConsentChange);
    return () =>
      window.removeEventListener(CONSENT_CHANGE_EVENT, onConsentChange);
  }, []);

  const update = (choice: Exclude<Consent, 'unknown'>) => {
    const saved = choose(choice);
    setChoice(choice);
    setStatus(
      saved
        ? `Analytics ${choice}.`
        : `Analytics ${choice} for this visit; browser storage is unavailable.`,
    );
  };

  return (
    <div className="analytics-settings" id="analytics-settings">
      <p>Current choice: {choice}.</p>
      <div className="link-row">
        <button
          className="button button-primary"
          onClick={() => update('accepted')}
          type="button"
        >
          Accept analytics
        </button>
        <button
          className="button button-secondary"
          onClick={() => update('declined')}
          type="button"
        >
          Decline analytics
        </button>
      </div>
      <p aria-live="polite" role="status">
        {status}
      </p>
    </div>
  );
}

export default function AnalyticsConsent() {
  const router = useRouter();
  const [consent, setConsent] = useState<Consent>('unknown');
  const lastPage = useRef<string | null>(null);

  useEffect(() => {
    const initial = readConsent(storage());
    setConsent(initial);
    if (initial === 'declined') revokeAnalyticsConsent();
    else setAnalyticsConsent(initial);

    const onConsentChange = () => setConsent(getAnalyticsConsent());
    window.addEventListener(CONSENT_CHANGE_EVENT, onConsentChange);
    return () =>
      window.removeEventListener(CONSENT_CHANGE_EVENT, onConsentChange);
  }, []);

  useEffect(() => {
    if (consent !== 'accepted' || !router.isReady) {
      lastPage.current = null;
      return;
    }

    loadGtm();
    const onRouteChange = (url: string) => trackPage(url, lastPage);
    trackPage(router.asPath, lastPage);
    router.events.on('routeChangeComplete', onRouteChange);
    return () => router.events.off('routeChangeComplete', onRouteChange);
  }, [consent, router]);

  const update = (choice: Exclude<Consent, 'unknown'>) => {
    choose(choice);
    setConsent(choice);
  };

  if (consent !== 'unknown') return null;
  return (
    <aside aria-label="Analytics preferences" className="consent-banner">
      <p>
        Optional, privacy-limited analytics help understand which work is
        useful. Your choice does not affect the site.
      </p>
      <div className="link-row">
        <button
          className="button button-primary"
          onClick={() => update('accepted')}
          type="button"
        >
          Accept analytics
        </button>
        <button
          className="button button-secondary"
          onClick={() => update('declined')}
          type="button"
        >
          Decline analytics
        </button>
        <Link className="text-link" href="/privacy/#analytics-settings">
          Privacy details
        </Link>
      </div>
    </aside>
  );
}
