const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

test('direct contact links have touch targets, wrapping, and reduced-motion-safe feedback', () => {
  const css = fs.readFileSync('styles/globals.css', 'utf8');
  const grid = css.match(/\.contact-grid\s*\{([^}]+)\}/)[1];
  assert.match(grid, /minmax\(22\.5rem, 0\.8fr\)/);
  const links = css.match(/\.contact-grid aside a\s*\{([^}]+)\}/)[1];
  assert.match(links, /min-height: 2.75rem/);
  assert.match(links, /overflow-wrap: anywhere/);
  assert.match(css, /\.contact-grid aside a:focus-visible\s*\{[^}]*color: var\(--blue\)/);
  assert.match(css, /\.contact-grid aside a:focus-visible svg\s*\{[^}]*animation: contact-icon-lift/);
  const reduced = css.slice(css.indexOf('@media (prefers-reduced-motion: reduce)'));
  assert.match(reduced, /\.contact-grid aside a svg\s*\{[^}]*animation: none !important/);
});
