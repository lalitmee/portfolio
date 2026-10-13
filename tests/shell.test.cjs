const assert = require('node:assert/strict');
const test = require('node:test');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const {
  RouterContext,
} = require('next/dist/shared/lib/router-context.shared-runtime');
const { SiteLayout } = require('../components/SiteLayout.tsx');

test('site shell renders one main and current route links', () => {
  const router = {
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
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
  const html = renderToStaticMarkup(
    React.createElement(
      RouterContext.Provider,
      { value: router },
      React.createElement(SiteLayout, {
        title: 'Home',
        description: 'Home description',
        children: React.createElement('h1', null, 'Page content'),
      }),
    ),
  );

  assert.equal((html.match(/<main\b/g) || []).length, 1);
  assert.doesNotMatch(
    html,
    /<main\b[^>]*>[\s\S]*<footer\b[^>]*>[\s\S]*<\/main>/,
  );
  assert.match(html, /href="#main-content"/);
  for (const path of [
    '/',
    '/work',
    '/projects',
    '/apps',
    '/about',
    '/contact',
  ]) {
    assert.match(html, new RegExp(`href="${path.replaceAll('/', '\\/')}"`));
  }
  assert.match(html, /aria-current="page"[^>]*href="\/"/);
  const wordmark =
    html.match(
      /<a\b[^>]*class="[^"]*\bwordmark\b[^"]*"[^>]*>[\s\S]*?<\/a>/,
    )?.[0] || '';
  assert.match(wordmark, /Lalit Kumar/);
  assert.match(wordmark, /<svg\b/);
});
