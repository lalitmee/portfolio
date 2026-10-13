const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { test } = require('node:test');
const analytics = require('../utils/analytics.ts');

const contactPage = readFileSync('pages/contact.tsx', 'utf8');
const privacyPage = readFileSync('pages/privacy.tsx', 'utf8');
const footer = readFileSync('components/Footer.tsx', 'utf8');
const analyticsDocs = readFileSync('docs/analytics-setup.md', 'utf8');

function withAnalytics(run) {
  const previous = {
    gtm: process.env.NEXT_PUBLIC_GTM_ID,
    ga: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
    window: global.window,
    document: global.document,
    location: global.location,
  };
  process.env.NEXT_PUBLIC_GTM_ID = 'GTM-ABC12345';
  process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID = 'G-ABC1234567';
  const layer = [];
  global.window = { dataLayer: layer, dispatchEvent: () => true };
  global.document = { cookie: '', getElementById: () => null };
  global.location = { pathname: '/', hostname: 'localhost' };
  analytics.setAnalyticsConsent('accepted');
  try {
    run(layer);
  } finally {
    global.window = previous.window;
    global.document = previous.document;
    global.location = previous.location;
    if (previous.gtm === undefined) delete process.env.NEXT_PUBLIC_GTM_ID;
    else process.env.NEXT_PUBLIC_GTM_ID = previous.gtm;
    if (previous.ga === undefined) delete process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
    else process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID = previous.ga;
    analytics.setAnalyticsConsent('unknown');
  }
}

test('contact reads public EmailJS settings through static property references', () => {
  for (const name of ['SERVICE_ID', 'TEMPLATE_ID', 'PUBLIC_KEY']) {
    assert.match(contactPage, new RegExp(`process\\.env\\.NEXT_PUBLIC_EMAILJS_${name}`));
  }
  assert.doesNotMatch(contactPage, /const\s*\{\s*NEXT_PUBLIC_EMAILJS_SERVICE_ID/);
});

test('accepts seven- and eight-character GTM container suffixes', () => {
  withAnalytics((layer) => {
    process.env.NEXT_PUBLIC_GTM_ID = 'GTM-ABC12345';
    assert.equal(analytics.trackEvent({ event: 'resume_download' }), true);
    assert.equal(layer.length, 1);
  });
});

test('revocation keeps the connected dataLayer and reacceptance does not duplicate GTM', () => {
  withAnalytics((layer) => {
    const scripts = new Map();
    let appended = 0;
    global.document.getElementById = (id) => scripts.get(id) || null;
    global.document.createElement = () => ({ id: '', remove() { scripts.delete(this.id); } });
    global.document.head = { appendChild(script) { appended += 1; scripts.set(script.id, script); } };
    layer.push({ event: 'page_view', page_path: '/' }, { event: 'gtm.js' });
    analytics.loadAnalytics();
    const script = scripts.get('portfolio-google-tag-manager');
    analytics.setAnalyticsConsent('declined');
    assert.equal(window.dataLayer, layer);
    assert.equal(layer.length, 2);
    assert.ok(layer.every(({ event }) => event === 'gtm.js'));
    analytics.setAnalyticsConsent('accepted');
    analytics.loadAnalytics();
    assert.equal(appended, 1);
    assert.ok(script);
    assert.equal(analytics.trackEvent({ event: 'resume_download' }), true);
    assert.equal(analytics.syncConsentFromStorage(analytics.CONSENT_KEY, null), 'unknown');
    assert.equal(analytics.trackEvent({ event: 'resume_download' }), false);
    assert.equal(layer.length, 2);
    assert.equal(layer[0].event, 'gtm.js');
    assert.equal(layer[1].event, 'gtm.js');
    assert.equal(typeof layer[1]['gtm.start'], 'number');
  });
});

test('reacceptance records an uncounted route while effect reruns do not duplicate it', () => {
  withAnalytics((layer) => {
    let lastPath = analytics.trackPageView('/work/nykaa-cart-reliability/', null);
    assert.equal(analytics.trackPageView('/work/nykaa-cart-reliability/', lastPath), lastPath);
    assert.deepEqual(layer, [
      { event: 'page_view', page_path: '/work/nykaa-cart-reliability/' },
      { event: 'case_study_view', case_slug: 'nykaa-cart-reliability' },
    ]);
    analytics.setAnalyticsConsent('declined');
    assert.deepEqual(layer, []);
    lastPath = analytics.trackPageView('/work/quartic-data-interfaces/', lastPath);
    analytics.setAnalyticsConsent('accepted');
    lastPath = analytics.trackPageView('/work/quartic-data-interfaces/', lastPath);
    assert.equal(lastPath, '/work/quartic-data-interfaces/');
    assert.deepEqual(layer, [
      { event: 'page_view', page_path: '/work/quartic-data-interfaces/' },
      { event: 'case_study_view', case_slug: 'quartic-data-interfaces' },
    ]);
  });
});

test('storage changes in another tab update this tab consent and suppress events', () => {
  withAnalytics((layer) => {
    assert.equal(analytics.syncConsentFromStorage(analytics.CONSENT_KEY, 'declined'), 'declined');
    assert.equal(analytics.trackEvent({ event: 'resume_download' }), false);
    assert.equal(analytics.syncConsentFromStorage('unrelated-key', 'accepted'), null);
    assert.deepEqual(layer, []);
  });
});

test('effective in-memory consent wins over a stale stored preference', () => {
  analytics.setAnalyticsConsent('accepted');
  try {
    assert.equal(analytics.readConsent({ getItem: () => 'declined' }), 'accepted');
  } finally {
    analytics.setAnalyticsConsent('unknown');
  }
});

test('privacy status subscribes to in-page consent changes', () => {
  assert.match(privacyPage, /addEventListener\(['"]portfolio-analytics-consent-change['"]/);
});

test('contact and footer expose the existing GitHub and LinkedIn destinations', () => {
  assert.match(contactPage, /portfolio\.contact\.social\.filter/);
  assert.match(footer, /portfolio\.contact\.social\.filter/);
  assert.match(contactPage, /channel: platform === 'GitHub' \? 'github' : 'linkedin'/);
});

test('GTM instructions explicitly override the referrer with a sanitized value', () => {
  assert.match(analyticsDocs, /explicitly set `page_referrer` to the canonical site origin/i);
  assert.doesNotMatch(analyticsDocs, /leave `page_referrer` unset/i);
});
