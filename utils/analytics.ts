export type Consent = 'accepted' | 'declined' | 'unknown';

export type AnalyticsEvent =
  | { event: 'page_view'; page_path: string }
  | { event: 'case_study_view'; case_slug: string }
  | { event: 'project_open'; project_slug: string; destination_kind: 'source' | 'demo' | 'detail' }
  | { event: 'resume_download' }
  | { event: 'contact_click'; channel: 'email' | 'github' | 'linkedin' }
  | { event: 'app_launch'; app_slug: string };

export const CONSENT_STORAGE_KEY = 'portfolio-analytics-consent';
let consent: Consent = 'unknown';

export function normalizePagePath(url: string): string {
  if (typeof url !== 'string' || url.length > 2048) return '/';
  try {
    const pathname = new URL(url, 'https://portfolio.invalid').pathname.replace(/\/{2,}/g, '/');
    return pathname === '/' ? '/' : `${pathname.replace(/\/$/, '')}/`;
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

export function saveConsent(storage: Pick<Storage, 'setItem'>, choice: Consent): boolean {
  if (choice !== 'accepted' && choice !== 'declined') return false;
  try {
    storage.setItem(CONSENT_STORAGE_KEY, choice);
    return true;
  } catch {
    return false;
  }
}

export function setAnalyticsConsent(choice: Consent): void {
  consent = choice;
}

function validConfig(): boolean {
  return /^GTM-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GTM_ID || '') &&
    /^G-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || '');
}

function validSlug(value: unknown): value is string {
  return typeof value === 'string' && value.length <= 80 && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

export function trackEvent(input: AnalyticsEvent): boolean {
  if (typeof window === 'undefined' || consent !== 'accepted' || !validConfig()) return false;
  const item = input as AnalyticsEvent & Record<string, unknown>;
  let payload: Record<string, string>;

  switch (item?.event) {
    case 'page_view':
      if (typeof item.page_path !== 'string' || !item.page_path.trim()) return false;
      payload = { event: item.event, page_path: normalizePagePath(item.page_path) };
      break;
    case 'case_study_view':
      if (!validSlug(item.case_slug)) return false;
      payload = { event: item.event, case_slug: item.case_slug };
      break;
    case 'project_open':
      if (!validSlug(item.project_slug) || !['source', 'demo', 'detail'].includes(item.destination_kind)) return false;
      payload = { event: item.event, project_slug: item.project_slug, destination_kind: item.destination_kind };
      break;
    case 'resume_download':
      payload = { event: item.event };
      break;
    case 'contact_click':
      if (!['email', 'github', 'linkedin'].includes(item.channel)) return false;
      payload = { event: item.event, channel: item.channel };
      break;
    case 'app_launch':
      if (!validSlug(item.app_slug)) return false;
      payload = { event: item.event, app_slug: item.app_slug };
      break;
    default:
      return false;
  }

  const layer = (window as Window & { dataLayer?: unknown[] }).dataLayer;
  if (!Array.isArray(layer)) return false;
  layer.push(payload);
  return true;
}
