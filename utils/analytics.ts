export type Consent = 'accepted' | 'declined' | 'unknown';
export type AnalyticsEvent =
  | { event: 'page_view'; page_path: string }
  | { event: 'case_study_view'; case_slug: string }
  | { event: 'project_open'; project_slug: string; destination_kind: 'source' | 'demo' | 'detail' }
  | { event: 'resume_download' }
  | { event: 'contact_click'; channel: 'email' | 'github' | 'linkedin' }
  | { event: 'app_launch'; app_slug: string };

export const CONSENT_KEY = 'portfolio-analytics-consent';
const caseSlugs = new Set(['nykaa-cart-reliability', 'nykaa-measurement-attribution', 'quartic-data-interfaces']);
const projectSlugs = new Set([
  'browse-nvim', 'cobalt2-nvim', 'github-search', 'dotfiles', 'portfolio', 'ud-myreads',
  'ud-neighborhood-map', 'ud-restaurant-rewiews-stage1', 'ud-feedreader-testing',
  'ud-classic-arcade-game', 'ud-memory-game', 'ud-pixel-art-maker', 'ud-portfolio',
  'codecompanion-spinners-nvim', 'markdown-previewer',
]);
const appSlugs = new Set(['markdown-previewer']);
const eventNames = new Set(['page_view', 'case_study_view', 'project_open', 'resume_download', 'contact_click', 'app_launch']);
let consent: Consent = 'unknown';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    [key: string]: unknown;
  }
}

function validConsent(value: unknown): value is Consent {
  return value === 'accepted' || value === 'declined' || value === 'unknown';
}

function analyticsIds() {
  const gtm = process.env.NEXT_PUBLIC_GTM_ID || '';
  const ga4 = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || '';
  return /^GTM-[A-Z0-9]{7}$/.test(gtm) && /^G-[A-Z0-9]{10}$/.test(ga4) ? { gtm, ga4 } : null;
}

export function normalizePagePath(url: string): string {
  try {
    return new URL(url, 'https://portfolio.invalid').pathname || '/';
  } catch {
    return url.split(/[?#]/)[0] || '/';
  }
}

export function readConsent(storage: Pick<Storage, 'getItem'>): Consent {
  try {
    const value = storage.getItem(CONSENT_KEY);
    return value === 'accepted' || value === 'declined' ? value : 'unknown';
  } catch {
    return consent;
  }
}

export function saveConsent(storage: Pick<Storage, 'setItem'>, choice: Consent): boolean {
  if (!validConsent(choice)) return false;
  try {
    storage.setItem(CONSENT_KEY, choice);
    return true;
  } catch {
    return false;
  }
}

function clearAnalyticsCookies() {
  if (typeof document === 'undefined') return;
  const names = document.cookie.split(';').map((cookie) => cookie.trim().split('=')[0])
    .filter((name) => /^_(?:ga(?:_|$)|gid(?:_|$)|gat(?:_|$))/.test(name));
  const paths = new Set(['/']);
  let path = location.pathname;
  while (path && path !== '/') {
    paths.add(path);
    path = path.slice(0, path.lastIndexOf('/')) || '/';
  }
  const hostname = location.hostname.split('.');
  const domains = new Set<string | undefined>([undefined]);
  for (let i = 0; i < hostname.length - 1; i++) domains.add(`.${hostname.slice(i).join('.')}`);
  names.forEach((name) => paths.forEach((cookiePath) => domains.forEach((domain) => {
    document.cookie = `${name}=; Max-Age=0; path=${cookiePath}; SameSite=Lax${domain ? `; domain=${domain}` : ''}`;
  })));
}

export function setAnalyticsConsent(choice: Consent): void {
  if (!validConsent(choice)) return;
  consent = choice;
  if (typeof window !== 'undefined') {
    const ids = analyticsIds();
    if (ids) window[`ga-disable-${ids.ga4}`] = choice !== 'accepted';
    if (choice === 'declined') {
      if (window.dataLayer) window.dataLayer = window.dataLayer.filter(({ event }) => !eventNames.has(String(event)));
      if (typeof document !== 'undefined') document.getElementById('portfolio-google-tag-manager')?.remove();
      clearAnalyticsCookies();
    }
    if (typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent<Consent>('portfolio-analytics-consent-change', { detail: choice }));
    }
  }
}

export function loadAnalytics(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined' || consent !== 'accepted') return false;
  const ids = analyticsIds();
  if (!ids) return false;
  window[`ga-disable-${ids.ga4}`] = false;
  if (document.getElementById('portfolio-google-tag-manager')) return true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const script = document.createElement('script');
  script.id = 'portfolio-google-tag-manager';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${ids.gtm}`;
  document.head.appendChild(script);
  return true;
}

function sanitizeEvent(value: unknown): AnalyticsEvent | null {
  if (!value || typeof value !== 'object') return null;
  const event = (value as { event?: unknown }).event;
  if (event === 'page_view') {
    const path = (value as { page_path?: unknown }).page_path;
    return typeof path === 'string' ? { event, page_path: normalizePagePath(path) } : null;
  }
  if (event === 'case_study_view') {
    const slug = (value as { case_slug?: unknown }).case_slug;
    return typeof slug === 'string' && caseSlugs.has(slug) ? { event, case_slug: slug } : null;
  }
  if (event === 'project_open') {
    const { project_slug, destination_kind } = value as { project_slug?: unknown; destination_kind?: unknown };
    return typeof project_slug === 'string' && projectSlugs.has(project_slug) &&
      (destination_kind === 'source' || destination_kind === 'demo' || destination_kind === 'detail')
      ? { event, project_slug, destination_kind } : null;
  }
  if (event === 'resume_download') return { event };
  if (event === 'contact_click') {
    const channel = (value as { channel?: unknown }).channel;
    return channel === 'email' || channel === 'github' || channel === 'linkedin' ? { event, channel } : null;
  }
  if (event === 'app_launch') {
    const slug = (value as { app_slug?: unknown }).app_slug;
    return typeof slug === 'string' && appSlugs.has(slug) ? { event, app_slug: slug } : null;
  }
  return null;
}

export function trackEvent(value: AnalyticsEvent): boolean {
  if (consent !== 'accepted' || typeof window === 'undefined' || !analyticsIds()) return false;
  const event = sanitizeEvent(value);
  if (!event) return false;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event as unknown as Record<string, unknown>);
  return true;
}
