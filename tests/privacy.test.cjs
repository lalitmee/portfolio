const assert = require('node:assert/strict');
const test = require('node:test');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { RouterContext } = require('next/dist/shared/lib/router-context.shared-runtime');
const PrivacyPage = require('../pages/privacy.tsx').default;

test('privacy page does not link to repository-only setup documentation', () => {
  const router = {
    route: '/privacy',
    pathname: '/privacy',
    query: {},
    asPath: '/privacy/',
    basePath: '',
    push: async () => true,
    replace: async () => true,
    reload: () => {},
    back: () => {},
    prefetch: async () => {},
    beforePopState: () => {},
    events: { on: () => {}, off: () => {}, emit: () => {} },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    isPreview: false,
  };
  const html = renderToStaticMarkup(React.createElement(
    RouterContext.Provider,
    { value: router },
    React.createElement(PrivacyPage),
  ));

  assert.doesNotMatch(html, /href="\/docs\/analytics-setup\.md"/);
});
