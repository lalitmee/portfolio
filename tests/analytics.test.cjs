const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const analytics = require('../utils/analytics.ts');

const validConfig = () => {
  process.env.NEXT_PUBLIC_GTM_ID = 'GTM-AB12CD';
  process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID = 'G-AB12CD';
};

function withWindow(dataLayer = []) {
  const previous = global.window;
  global.window = { dataLayer };
  return () => {
    if (previous === undefined) delete global.window;
    else global.window = previous;
  };
}

test('normalizes page URLs without query or fragment', () => {
  assert.equal(
    analytics.normalizePagePath('/work/example/?email=secret#text'),
    '/work/example/',
  );
});

test('blocked storage is treated as unknown and failed writes return false', () => {
  assert.equal(
    analytics.readConsent({
      getItem() {
        throw new Error('blocked');
      },
    }),
    'unknown',
  );
  assert.equal(
    analytics.saveConsent(
      {
        setItem() {
          throw new Error('blocked');
        },
      },
      'accepted',
    ),
    false,
  );
  assert.equal(analytics.saveConsent({ setItem() {} }, 'unknown'), false);
});

test('unknown, declined, server, and invalid configuration never emit', () => {
  const restore = withWindow();
  validConfig();
  analytics.setAnalyticsConsent('unknown');
  assert.equal(analytics.trackEvent({ event: 'resume_download' }), false);
  analytics.setAnalyticsConsent('declined');
  assert.equal(analytics.trackEvent({ event: 'resume_download' }), false);
  analytics.setAnalyticsConsent('accepted');
  process.env.NEXT_PUBLIC_GTM_ID = 'invalid';
  assert.equal(analytics.trackEvent({ event: 'resume_download' }), false);
  restore();
  delete global.window;
  process.env.NEXT_PUBLIC_GTM_ID = 'GTM-AB12CD';
  assert.equal(analytics.trackEvent({ event: 'resume_download' }), false);
});

test('reconstructs only allowlisted event fields', () => {
  const layer = [];
  const restore = withWindow(layer);
  validConfig();
  analytics.setAnalyticsConsent('accepted');
  assert.equal(
    analytics.trackEvent({
      event: 'contact_click',
      channel: 'email',
      email: 'person@example.com',
      message: 'private',
    }),
    true,
  );
  assert.deepEqual(layer, [{ event: 'contact_click', channel: 'email' }]);
  restore();
});

test('rejects malformed event names, slugs, and channels', () => {
  const restore = withWindow();
  validConfig();
  analytics.setAnalyticsConsent('accepted');
  assert.equal(analytics.trackEvent({ event: 'secret_event' }), false);
  assert.equal(
    analytics.trackEvent({
      event: 'case_study_view',
      case_slug: 'someone@example.com',
    }),
    false,
  );
  assert.equal(
    analytics.trackEvent({ event: 'app_launch', app_slug: '../settings' }),
    false,
  );
  assert.equal(
    analytics.trackEvent({ event: 'contact_click', channel: 'phone' }),
    false,
  );
  restore();
});

test('wires the six allowed events to their intended interactions', () => {
  const source = (file) =>
    fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  assert.match(source('pages/_app.tsx'), /<AnalyticsConsent\s*\/>/);
  assert.match(
    source('components/AnalyticsConsent.tsx'),
    /event: 'case_study_view'/,
  );
  assert.doesNotMatch(source('pages/work/[slug].tsx'), /trackEvent|useEffect/);
  assert.match(
    source('pages/projects/index.tsx'),
    /destination_kind: 'detail'/,
  );
  assert.match(
    source('pages/projects/[slug].tsx'),
    /destination_kind: 'source'/,
  );
  assert.match(source('pages/projects/[slug].tsx'), /destination_kind: 'demo'/);
  assert.match(source('pages/about.tsx'), /event: 'resume_download'/);
  assert.match(source('components/Contact.tsx'), /event: 'contact_click'/);
  assert.match(source('pages/apps/index.tsx'), /event: 'app_launch'/);
});

test('queues GTM commands using the supported gtag arguments shape', () => {
  assert.match(
    fs.readFileSync(
      path.join(__dirname, '..', 'components/AnalyticsConsent.tsx'),
      'utf8',
    ),
    /dataLayer\.push\(arguments\)/,
  );
});

test('configures the supplied GTM and GA4 IDs by default', () => {
  const source = fs.readFileSync(
    path.join(__dirname, '..', 'utils/analytics.ts'),
    'utf8',
  );
  assert.match(source, /DEFAULT_GTM_ID\s*=\s*'GTM-M8B2D5JZ'/);
  assert.match(
    source,
    /DEFAULT_GA4_MEASUREMENT_ID\s*=\s*'G-QLXWYJ6CVN'/,
  );
});
