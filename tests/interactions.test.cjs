const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

test('ArrowIcon renders a decorative SVG', () => {
  const ArrowIcon = require('../components/ArrowIcon').default;
  const markup = renderToStaticMarkup(React.createElement(ArrowIcon));

  assert.match(markup, /<svg[^>]*aria-hidden="true"/);
});

test('interaction styles respond to hover and keyboard focus', () => {
  const css = fs.readFileSync('styles/globals.css', 'utf8');

  assert.match(css, /\.brand-link:hover[^{]*\.brand-mark/);
  assert.match(css, /\.brand-link:focus-visible[^{]*\.brand-mark/);
  assert.match(css, /\.interaction-arrow/);
  assert.match(css, /\.interactive-card:focus-within/);
  assert.match(
    css,
    /:focus-visible\s*,[\s\S]*?outline: 3px solid var\(--highlight\)/,
  );
});

test('reduced motion disables added transforms and brand drawing', () => {
  const css = fs.readFileSync('styles/globals.css', 'utf8');
  const reducedMotion =
    css.match(
      /@media \(prefers-reduced-motion: reduce\)\s*\{([\s\S]*?)\n\}/,
    )?.[1] ?? '';

  assert.match(reducedMotion, /\.brand-mark[^}]*animation:\s*none/);
  assert.match(reducedMotion, /\.interaction-arrow[^}]*transform:\s*none/);
  assert.match(reducedMotion, /\.interactive-card[^}]*transform:\s*none/);
});
