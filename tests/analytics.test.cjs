const assert = require('node:assert/strict');
const test = require('node:test');
const {
  normalizePagePath,
  readConsent,
  saveConsent,
  setAnalyticsConsent,
  trackEvent,
} = require('../utils/analytics.ts');

const validEvent = { event: 'page_view', page_path: '/work/example/' };

function browser() {
  global.window = { dataLayer: [], location: { hostname: 'www.lalitmee.com' } };
  process.env.NEXT_PUBLIC_GTM_ID = 'GTM-ABC1234';
  process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID = 'G-ABC1234567';
}

test('normalizes route paths without query strings or fragments', () => {
  assert.equal(normalizePagePath('/work/example/?email=secret#text'), '/work/example/');
  assert.equal(normalizePagePath('https://outside.example/private/'), '/');
  assert.equal(normalizePagePath('/contact/ada@example.com/'), '/');
});

test('storage failures leave consent unknown and report save failure', () => {
  assert.equal(readConsent({ getItem() { throw new Error('blocked'); } }), 'unknown');
  assert.equal(saveConsent({ setItem() { throw new Error('blocked'); } }, 'accepted'), false);
});

test('unknown, declined, and server-side tracking never push events', () => {
  browser();
  setAnalyticsConsent('unknown');
  assert.equal(trackEvent(validEvent), false);
  setAnalyticsConsent('declined');
  assert.equal(trackEvent(validEvent), false);
  assert.deepEqual(window.dataLayer, []);

  delete global.window;
  setAnalyticsConsent('accepted');
  assert.equal(trackEvent(validEvent), false);
});

test('missing or malformed GTM and GA4 IDs never push events', () => {
  browser();
  setAnalyticsConsent('accepted');
  delete process.env.NEXT_PUBLIC_GTM_ID;
  assert.equal(trackEvent(validEvent), false);
  process.env.NEXT_PUBLIC_GTM_ID = 'not-a-container-id';
  assert.equal(trackEvent(validEvent), false);
  process.env.NEXT_PUBLIC_GTM_ID = 'GTM-ABC1234';
  delete process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  assert.equal(trackEvent(validEvent), false);
  process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID = 'invalid';
  assert.equal(trackEvent(validEvent), false);
  assert.deepEqual(window.dataLayer, []);
});

test('rejects unknown events, unsafe slugs, and contact channels', () => {
  browser();
  setAnalyticsConsent('accepted');
  assert.equal(trackEvent({ event: 'email_sent', email: 'secret@example.com' }), false);
  assert.equal(trackEvent({ event: 'case_study_view', case_slug: '../secret' }), false);
  assert.equal(trackEvent({ event: 'project_open', project_slug: 'browse-nvim', destination_kind: 'email' }), false);
  assert.equal(trackEvent({ event: 'project_open', project_slug: 'unknown-project', destination_kind: 'detail' }), false);
  assert.equal(trackEvent({ event: 'contact_click', channel: 'phone' }), false);
  assert.deepEqual(window.dataLayer, []);
});

test('rebuilds allowed payloads and drops all extra fields', () => {
  browser();
  setAnalyticsConsent('accepted');
  assert.equal(trackEvent({ event: 'contact_click', channel: 'email', email: 'secret@example.com' }), true);
  assert.deepEqual(window.dataLayer, [{ event: 'contact_click', channel: 'email' }]);
});

test('withdrawal disables GA4, clears queued portfolio events, and expires accessible analytics cookies', () => {
  browser();
  const writes = [];
  const document = {
    get cookie() { return '_ga=old; _ga_ABC123=old; _gid=old; session=keep'; },
    set cookie(value) { writes.push(value); },
  };
  global.window.document = document;
  global.window.location.pathname = '/privacy/';
  window.dataLayer = [
    { event: 'gtm.js' },
    { event: 'page_view', page_path: '/contact/' },
    { event: 'contact_click', channel: 'email' },
    { event: 'other_event' },
  ];
  const dataLayer = window.dataLayer;
  setAnalyticsConsent('accepted');

  const { revokeAnalyticsConsent } = require('../utils/analytics.ts');
  revokeAnalyticsConsent();

  assert.equal(window['ga-disable-G-ABC1234567'], true);
  assert.equal(window.dataLayer, dataLayer);
  assert.equal(window.dataLayer.some((item) => item.event === 'page_view' || item.event === 'contact_click'), false);
  assert.equal(window.dataLayer.some((item) => item.event === 'gtm.js'), true);
  assert.equal(window.dataLayer.some((item) => Array.isArray(item) && item[1] === 'update' && item[2].analytics_storage === 'denied'), true);
  assert.equal(writes.some((value) => value.includes('_ga=') && value.includes('path=/') && value.includes('domain=lalitmee.com')), true);
  assert.equal(writes.some((value) => value.includes('_ga=') && value.includes('path=/privacy;')), true);
});
