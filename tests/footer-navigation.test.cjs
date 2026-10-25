const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

test('footer separates Privacy from its primary sitemap', () => {
  const source = fs.readFileSync('components/Footer.tsx', 'utf8');
  assert.doesNotMatch(source.match(/const links = \[[\s\S]*?\];/)[0], /Privacy/);
  assert.match(source, /className="footer-meta"/);
  assert.match(source, /href="\/privacy\/">Privacy<\/Link>/);
});

test('back-to-top arrow repeats gently, pauses for interaction, and respects reduced motion', () => {
  const css = fs.readFileSync('styles/globals.css', 'utf8');
  assert.match(css, /\.back-to-top svg\s*\{[^}]*animation: back-to-top-bounce 2\.5s ease-in-out infinite;/);
  assert.match(css, /\.back-to-top:hover svg,[\s\S]*?animation-play-state: paused;/);
  assert.match(css, /@keyframes back-to-top-bounce\s*\{[\s\S]*?translateY\(-3px\)/);
  const reduced = css.slice(css.indexOf('@media (prefers-reduced-motion: reduce)'));
  assert.match(reduced, /\.back-to-top svg\s*\{[^}]*animation: none/);
});
