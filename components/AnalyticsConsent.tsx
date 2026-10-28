import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import {
  normalizePagePath,
  readConsent,
  saveConsent,
  setAnalyticsConsent,
  trackEvent,
  DEFAULT_GA4_MEASUREMENT_ID,
  DEFAULT_GTM_ID,
  type Consent,
} from '../utils/analytics';

const consentState = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
};
const customEventNames = new Set([
  'page_view',
  'case_study_view',
  'project_open',
  'resume_download',
  'contact_click',
  'app_launch',
]);
let gtmInitialized = false;

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

function setMeasurementDisabled(measurementId: string, disabled: boolean) {
  (window as unknown as Record<string, boolean>)[
    `ga-disable-${measurementId}`
  ] = disabled;
}

function storage(): Storage | undefined {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

const gtag = function () {
  const target = window as unknown as AnalyticsWindow;
  target.dataLayer ||= [];
  target.dataLayer.push(arguments);
} as (...args: unknown[]) => void;

function loadGtm(gtmId: string, measurementId: string) {
  const target = window as unknown as AnalyticsWindow;
  setMeasurementDisabled(measurementId, false);
  target.dataLayer ||= [];
  target.gtag = gtag;
  if (gtmInitialized) {
    gtag('consent', 'update', {
      ...consentState,
      analytics_storage: 'granted',
    });
    return;
  }
  gtag('consent', 'default', consentState);
  gtag('consent', 'update', { ...consentState, analytics_storage: 'granted' });
  gtag('js', new Date());
  gtag('config', measurementId, { send_page_view: false });
  target.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const script = document.createElement('script');
  script.id = 'portfolio-gtm';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
  document.head.appendChild(script);
  gtmInitialized = true;
}

function clearAnalyticsCookies() {
  const names = document.cookie
    .split(';')
    .map((entry) => entry.trim().split('=')[0]);
  const analyticsNames = names.filter(
    (name) => name === '_ga' || name.startsWith('_ga_'),
  );
  const hostname = location.hostname;
  const labels = hostname.split('.');
  const domains = new Set([hostname, `.${hostname}`]);
  for (let i = 1; i < labels.length - 1; i++) {
    const parent = labels.slice(i).join('.');
    domains.add(parent);
    domains.add(`.${parent}`);
  }
  const paths = new Set(['/']);
  const parts = location.pathname.split('/').filter(Boolean);
  while (parts.length) {
    const path = `/${parts.join('/')}`;
    paths.add(path);
    paths.add(`${path}/`);
    parts.pop();
  }

  for (const name of analyticsNames) {
    Array.from(paths).forEach((path) => {
      Array.from(domains).forEach((domain) => {
        document.cookie = `${name}=; Max-Age=0; path=${path}; domain=${domain}; SameSite=Lax`;
      });
      document.cookie = `${name}=; Max-Age=0; path=${path}; SameSite=Lax`;
    });
  }
}

function revokeAnalytics(measurementId: string) {
  const target = window as unknown as AnalyticsWindow;
  setMeasurementDisabled(measurementId, true);
  setAnalyticsConsent('declined');
  target.gtag?.('consent', 'update', consentState);
  if (Array.isArray(target.dataLayer)) {
    const retained = target.dataLayer.filter(
      (entry) =>
        !entry ||
        typeof entry !== 'object' ||
        !customEventNames.has(String((entry as { event?: unknown }).event)),
    );
    target.dataLayer.splice(0, target.dataLayer.length, ...retained);
  }
  clearAnalyticsCookies();
}

export default function AnalyticsConsent() {
  const router = useRouter();
  const [choice, setChoice] = useState<Consent>('unknown');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const initialPageSent = useRef(false);
  const restoredAccepted = useRef(false);
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || DEFAULT_GTM_ID;
  const measurementId =
    process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || DEFAULT_GA4_MEASUREMENT_ID;
  const configured =
    /^GTM-[A-Z0-9]+$/.test(gtmId) && /^G-[A-Z0-9]+$/.test(measurementId);

  useEffect(() => {
    if (!configured) return;
    const current = readConsent(storage() || { getItem: () => null });
    restoredAccepted.current = current === 'accepted';
    setAnalyticsConsent(current);
    setChoice(current);
  }, [configured]);

  useEffect(() => {
    if (choice !== 'accepted') {
      initialPageSent.current = false;
      if (choice === 'declined' && configured) {
        setMeasurementDisabled(measurementId, true);
        setAnalyticsConsent('declined');
      }
      return;
    }
    if (!configured || !router.isReady) return;

    loadGtm(gtmId, measurementId);
    if (!initialPageSent.current) {
      trackEvent({
        event: 'page_view',
        page_path: normalizePagePath(window.location.pathname),
      });
      const initialCase = caseSlugFromPath(window.location.pathname);
      if (restoredAccepted.current && initialCase) {
        trackEvent({ event: 'case_study_view', case_slug: initialCase });
      }
      restoredAccepted.current = false;
      initialPageSent.current = true;
    }
  }, [choice, configured, gtmId, measurementId, router.isReady]);

  useEffect(() => {
    if (choice !== 'accepted' || !configured || !router.isReady) return;
    const onRouteComplete = (url: string) => {
      trackEvent({ event: 'page_view', page_path: normalizePagePath(url) });
      const caseSlug = caseSlugFromPath(url);
      if (caseSlug)
        trackEvent({ event: 'case_study_view', case_slug: caseSlug });
    };
    router.events.on('routeChangeComplete', onRouteComplete);
    return () => router.events.off('routeChangeComplete', onRouteComplete);
  }, [choice, configured, router.events, router.isReady]);

  function select(next: Exclude<Consent, 'unknown'>) {
    saveConsent(
      storage() || {
        setItem: () => {
          throw new Error('storage unavailable');
        },
      },
      next,
    );
    if (next === 'declined' && configured) revokeAnalytics(measurementId);
    else setAnalyticsConsent(next);
    setChoice(next);
    setSettingsOpen(false);
  }

  if (!configured || (choice !== 'unknown' && router.pathname !== '/privacy'))
    return null;

  return (
    <aside className="consent-panel" aria-label="Analytics privacy settings">
      {choice === 'unknown' && (
        <div className="consent-prompt">
          <p>
            Optional analytics help me understand which work and tools are
            useful. No analytics run unless you accept.
          </p>
          <button type="button" onClick={() => select('accepted')}>
            Accept analytics
          </button>
          <button type="button" onClick={() => select('declined')}>
            Decline
          </button>
        </div>
      )}
      {router.pathname === '/privacy' && (
        <div className="consent-settings">
          <button
            type="button"
            className="text-link"
            onClick={() => setSettingsOpen((open) => !open)}
          >
            {settingsOpen
              ? 'Close analytics settings'
              : 'Change analytics settings'}
          </button>
          {settingsOpen && (
            <div>
              <p>Optional analytics are currently {choice}.</p>
              <button type="button" onClick={() => select('accepted')}>
                Accept analytics
              </button>
              <button type="button" onClick={() => select('declined')}>
                Decline analytics
              </button>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}

function caseSlugFromPath(url: string): string | undefined {
  const match = normalizePagePath(url).match(
    /^\/work\/([a-z0-9]+(?:-[a-z0-9]+)*)\/$/,
  );
  return match?.[1];
}
