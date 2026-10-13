const assert = require('node:assert/strict');
const { test } = require('node:test');
const {
  normalizePagePath,
  readConsent,
  saveConsent,
  setAnalyticsConsent,
  trackEvent,
} = require('../utils/analytics.ts');

test('normalizes paths without query or fragment data', () => {
  assert.equal(
    normalizePagePath('/work/example/?email=secret#text'),
    '/work/example/',
  );
  assert.equal(
    normalizePagePath('https://example.com/projects/?token=private'),
    '/projects/',
  );
});

test('treats unknown values and blocked storage as unknown', () => {
  assert.equal(readConsent({ getItem: () => 'bogus' }), 'unknown');
  assert.equal(
    readConsent({
      getItem() {
        throw new Error('blocked');
      },
    }),
    'unknown',
  );
  assert.equal(
    saveConsent(
      {
        setItem() {
          throw new Error('blocked');
        },
      },
      'accepted',
    ),
    false,
  );
});

test('broadcasts the in-memory consent choice when browser storage is unavailable', () => {
  const previousWindow = global.window;
  let received;
  global.window = {
    dispatchEvent: (event) => {
      received = event;
      return true;
    },
  };
  try {
    setAnalyticsConsent('accepted');
    assert.equal(received.type, 'portfolio-analytics-consent-change');
    assert.equal(received.detail, 'accepted');
  } finally {
    global.window = previousWindow;
    setAnalyticsConsent('unknown');
  }
});

test('reads the in-memory consent choice when storage is blocked', () => {
  const { getItem } = {
    getItem() {
      throw new Error('blocked');
    },
  };
  setAnalyticsConsent('accepted');
  try {
    assert.equal(readConsent({ getItem }), 'accepted');
  } finally {
    setAnalyticsConsent('unknown');
  }
});

test('does not push on the server or without accepted consent', () => {
  const previousWindow = global.window;
  const previousGtm = process.env.NEXT_PUBLIC_GTM_ID;
  const previousGa = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  process.env.NEXT_PUBLIC_GTM_ID = 'GTM-ABC1234';
  process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID = 'G-ABC1234567';
  global.window = { dataLayer: [] };
  try {
    setAnalyticsConsent('unknown');
    assert.equal(trackEvent({ event: 'resume_download' }), false);
    setAnalyticsConsent('declined');
    assert.equal(trackEvent({ event: 'resume_download' }), false);
    assert.deepEqual(window.dataLayer, []);
    delete global.window;
    setAnalyticsConsent('accepted');
    assert.equal(trackEvent({ event: 'resume_download' }), false);
  } finally {
    global.window = previousWindow;
    if (previousGtm === undefined) delete process.env.NEXT_PUBLIC_GTM_ID;
    else process.env.NEXT_PUBLIC_GTM_ID = previousGtm;
    if (previousGa === undefined)
      delete process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
    else process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID = previousGa;
    setAnalyticsConsent('unknown');
  }
});

test('rejects missing or malformed measurement IDs', () => {
  const previousWindow = global.window;
  const previousGtm = process.env.NEXT_PUBLIC_GTM_ID;
  const previousGa = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  global.window = { dataLayer: [] };
  setAnalyticsConsent('accepted');
  for (const [gtm, ga] of [
    [undefined, 'G-ABC1234567'],
    ['bad', 'G-ABC1234567'],
    ['GTM-ABC1234', 'bad'],
    ['GTM-ABC', 'G-ABC'],
  ]) {
    if (gtm === undefined) delete process.env.NEXT_PUBLIC_GTM_ID;
    else process.env.NEXT_PUBLIC_GTM_ID = gtm;
    process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID = ga;
    assert.equal(trackEvent({ event: 'resume_download' }), false);
  }
  assert.deepEqual(window.dataLayer, []);
  global.window = previousWindow;
  if (previousGtm === undefined) delete process.env.NEXT_PUBLIC_GTM_ID;
  else process.env.NEXT_PUBLIC_GTM_ID = previousGtm;
  if (previousGa === undefined)
    delete process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  else process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID = previousGa;
  setAnalyticsConsent('unknown');
});

test('allowlists events and drops arbitrary event properties', () => {
  const previousWindow = global.window;
  const previousGtm = process.env.NEXT_PUBLIC_GTM_ID;
  const previousGa = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  process.env.NEXT_PUBLIC_GTM_ID = 'GTM-ABC1234';
  process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID = 'G-ABC1234567';
  global.window = { dataLayer: [] };
  setAnalyticsConsent('accepted');
  try {
    assert.equal(
      trackEvent({
        event: 'page_view',
        page_path: '/work/example/?secret=1',
        email: 'private',
      }),
      true,
    );
    assert.deepEqual(window.dataLayer, [
      { event: 'page_view', page_path: '/work/example/' },
    ]);
    assert.equal(
      trackEvent({ event: 'contact_click', channel: 'password' }),
      false,
    );
    assert.equal(
      trackEvent({
        event: 'project_open',
        project_slug: '../private',
        destination_kind: 'source',
      }),
      false,
    );
    assert.equal(trackEvent({ event: 'not_an_event' }), false);
    assert.equal(window.dataLayer.length, 1);
  } finally {
    global.window = previousWindow;
    if (previousGtm === undefined) delete process.env.NEXT_PUBLIC_GTM_ID;
    else process.env.NEXT_PUBLIC_GTM_ID = previousGtm;
    if (previousGa === undefined)
      delete process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
    else process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID = previousGa;
    setAnalyticsConsent('unknown');
  }
});
