import portfolio from '../data/portfolio.json';
import { caseStudies } from '../data/caseStudies';
import { generateSlug } from './slug';

export type Consent = 'accepted' | 'declined' | 'unknown';
export type AnalyticsEvent =
  | { event: 'page_view'; page_path: string }
  | { event: 'case_study_view'; case_slug: string }
  | {
      event: 'project_open';
      project_slug: string;
      destination_kind: 'source' | 'demo' | 'detail';
    }
  | { event: 'resume_download' }
  | { event: 'contact_click'; channel: 'email' | 'github' | 'linkedin' }
  | { event: 'app_launch'; app_slug: string };

export const CONSENT_STORAGE_KEY = 'portfolio-analytics-consent';
export const CONSENT_CHANGE_EVENT = 'portfolio-analytics-consent-change';

const canonicalOrigin = 'https://www.lalitmee.com';
const gtmPattern = /^GTM-[A-Z0-9]{4,20}$/;
const ga4Pattern = /^G-[A-Z0-9]{6,20}$/;
const validProjectSlugs = new Set(
  portfolio.projects.map(({ title }) => generateSlug(title)),
);
const validCaseSlugs = new Set(caseStudies.map(({ slug }) => slug));
let consent: Consent = 'unknown';

export function getAnalyticsConfig() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const ga4Id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  return gtmId && ga4Id && gtmPattern.test(gtmId) && ga4Pattern.test(ga4Id)
    ? { gtmId, ga4Id }
    : undefined;
}

export function normalizePagePath(url: string): string {
  try {
    const parsed = new URL(url, canonicalOrigin);
    if (
      parsed.origin !== canonicalOrigin ||
      !/^\/[A-Za-z0-9/_-]*$/.test(parsed.pathname)
    )
      return '/';
    return parsed.pathname.endsWith('/')
      ? parsed.pathname
      : `${parsed.pathname}/`;
  } catch {
    return '/';
  }
}

export function readConsent(storage: Pick<Storage, 'getItem'>): Consent {
  try {
    const value = storage.getItem(CONSENT_STORAGE_KEY);
    return value === 'accepted' || value === 'declined' ? value : 'unknown';
  } catch {
    return 'unknown';
  }
}

export function saveConsent(
  storage: Pick<Storage, 'setItem'>,
  choice: Consent,
): boolean {
  if (choice !== 'accepted' && choice !== 'declined') return false;
  try {
    storage.setItem(CONSENT_STORAGE_KEY, choice);
    return true;
  } catch {
    return false;
  }
}

export function getAnalyticsConsent(): Consent {
  return consent;
}

export function setAnalyticsConsent(choice: Consent): void {
  consent = choice;
  const config = getAnalyticsConfig();
  if (typeof window !== 'undefined' && config) {
    (window as unknown as Record<string, unknown>)[
      `ga-disable-${config.ga4Id}`
    ] = choice !== 'accepted';
    if (
      typeof window.dispatchEvent === 'function' &&
      typeof Event !== 'undefined'
    ) {
      window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
    }
  }
}

function safePayload(value: unknown): Record<string, string> | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const event = value as Record<string, unknown>;
  switch (event.event) {
    case 'page_view':
      return typeof event.page_path === 'string'
        ? { event: 'page_view', page_path: normalizePagePath(event.page_path) }
        : undefined;
    case 'case_study_view':
      return typeof event.case_slug === 'string' &&
        validCaseSlugs.has(event.case_slug)
        ? { event: 'case_study_view', case_slug: event.case_slug }
        : undefined;
    case 'project_open':
      return typeof event.project_slug === 'string' &&
        validProjectSlugs.has(event.project_slug) &&
        (event.destination_kind === 'source' ||
          event.destination_kind === 'demo' ||
          event.destination_kind === 'detail')
        ? {
            event: 'project_open',
            project_slug: event.project_slug,
            destination_kind: event.destination_kind,
          }
        : undefined;
    case 'resume_download':
      return { event: 'resume_download' };
    case 'contact_click':
      return event.channel === 'email' ||
        event.channel === 'github' ||
        event.channel === 'linkedin'
        ? { event: 'contact_click', channel: event.channel }
        : undefined;
    case 'app_launch':
      return event.app_slug === 'markdown-preview'
        ? { event: 'app_launch', app_slug: 'markdown-preview' }
        : undefined;
    default:
      return undefined;
  }
}

export function trackEvent(event: AnalyticsEvent): boolean {
  const config = getAnalyticsConfig();
  if (consent !== 'accepted' || !config || typeof window === 'undefined')
    return false;
  const payload = safePayload(event);
  const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer;
  if (!payload || !Array.isArray(dataLayer)) return false;
  dataLayer.push(payload);
  return true;
}

function clearAnalyticsCookies(
  document: Document,
  hostname: string,
  pathname: string,
): void {
  const names = document.cookie
    .split(';')
    .map((cookie) => cookie.trim().split('=', 1)[0]);
  const analyticsNames = names.filter((name) =>
    /^(_ga(?:_|$)|_gid$|_gat(?:_|$)|_gac_|_gcl_)/.test(name),
  );
  const labels = hostname.split('.');
  const domains = labels
    .slice(0, -1)
    .map((_, index) => labels.slice(index).join('.'));
  const paths = ['/'];
  const segments = pathname.split('/').filter(Boolean);
  for (let index = 1; index <= segments.length; index += 1) {
    const path = `/${segments.slice(0, index).join('/')}`;
    paths.push(path, `${path}/`);
  }

  for (const name of analyticsNames) {
    for (const path of paths) {
      document.cookie = `${name}=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
      for (const domain of domains) {
        document.cookie = `${name}=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}; domain=${domain}`;
        document.cookie = `${name}=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}; domain=.${domain}`;
      }
    }
  }
}

export function revokeAnalyticsConsent(): void {
  setAnalyticsConsent('declined');
  if (typeof window === 'undefined') return;

  const browserWindow = window as Window & { dataLayer?: unknown[] };
  const config = getAnalyticsConfig();
  if (config && Array.isArray(browserWindow.dataLayer)) {
    const dataLayer = browserWindow.dataLayer;
    dataLayer.push([
      'consent',
      'update',
      {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      },
    ]);
    const retained = dataLayer.filter(
      (item) =>
        !item ||
        typeof item !== 'object' ||
        !('event' in item) ||
        ![
          'page_view',
          'case_study_view',
          'project_open',
          'resume_download',
          'contact_click',
          'app_launch',
        ].includes(String(item.event)),
    );
    dataLayer.splice(0, dataLayer.length, ...retained);
  }
  clearAnalyticsCookies(
    window.document,
    window.location.hostname,
    window.location.pathname,
  );
}
