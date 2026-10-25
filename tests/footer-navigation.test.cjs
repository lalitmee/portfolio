const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

test('footer separates Privacy from its primary sitemap', () => {
  const source = fs.readFileSync('components/Footer.tsx', 'utf8');
  assert.doesNotMatch(source.match(/const links = \[[\s\S]*?\];/)[0], /Privacy/);
  assert.match(source, /className="footer-meta"/);
  assert.match(source, /href="\/privacy\/">Privacy<\/Link>/);
});

test('back-to-top uses finite internal motion without autoplay', () => {
  const css = fs.readFileSync('styles/globals.css', 'utf8');
  assert.doesNotMatch(css, /back-to-top-bounce|send-icon-flight|contact-icon-lift|arrow-bounce-tilt/);
  assert.match(css, /\.up-head\s*\{[^}]*--icon-motion: icon-up/);
  assert.match(css, /\.animated-icon \.icon-detail\s*\{[^}]*animation: none !important/);
  assert.match(fs.readFileSync('components/BackToTop.tsx', 'utf8'), /<UpArrowIcon/);
});
