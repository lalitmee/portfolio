const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
require('./load-tsx.cjs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

test('direct contact destinations keep labels and decorative internal-motion icons', () => {
  const Contact = require('../components/Contact.tsx').default;
  const html = renderToStaticMarkup(React.createElement(Contact));
  for (const [url, label, variant] of [
    ['mailto:lalitkumar.meena.lk@gmail.com', 'lalitkumar.meena.lk@gmail.com', 'email'],
    ['https://github.com/lalitmee', 'GitHub', 'brand'],
    ['https://linkedin.com/in/lalitmee', 'LinkedIn', 'brand'],
  ]) {
    const anchor = [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].find(match => match[1] === url);
    assert.ok(anchor);
    assert.match(anchor[2], new RegExp(`class="animated-icon icon-${variant}`));
    assert.match(anchor[2], /aria-hidden="true"/);
    if (label) assert.ok(anchor[2].includes(label));
  }
});

test('direct contact links have touch targets, wrapping, and reduced-motion-safe feedback', () => {
  const css = fs.readFileSync('styles/globals.css', 'utf8');
  const grid = css.match(/\.contact-grid\s*\{([^}]+)\}/)[1];
  assert.match(grid, /minmax\(22\.5rem, 0\.8fr\)/);
  const links = css.match(/\.contact-grid aside a\s*\{([^}]+)\}/)[1];
  assert.match(links, /min-height: 2.75rem/);
  assert.match(links, /overflow-wrap: anywhere/);
  assert.match(css, /\.contact-grid aside a:focus-visible\s*\{[^}]*color: var\(--blue\)/);
  assert.doesNotMatch(css, /animation: contact-icon-lift/);
  const reduced = css.slice(css.indexOf('@media (prefers-reduced-motion: reduce)'));
  assert.match(reduced, /\.contact-grid aside a svg\s*\{[^}]*animation: none !important/);
});
