const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

test('hamburger icon defines smooth morph transitions between 3-bar and X states', () => {
  const css = fs.readFileSync(
    path.join(__dirname, '../styles/globals.css'),
    'utf8',
  );
  assert.match(css, /\.menu-bar\s*\{[^}]*transform-origin:\s*12px 12px/);
  assert.match(css, /\.menu-bar\s*\{[^}]*transition:[^}]*transform/);
  assert.match(
    css,
    /\.menu-toggle\[aria-expanded='true'\] \.menu-bar-top[\s\S]*?transform:\s*rotate\(45deg\) translateY\(6px\)/,
  );
  assert.match(
    css,
    /\.menu-toggle\[aria-expanded='true'\] \.menu-bar-middle[\s\S]*?opacity:\s*0/,
  );
  assert.match(
    css,
    /\.menu-toggle\[aria-expanded='true'\] \.menu-bar-bottom[\s\S]*?transform:\s*rotate\(-45deg\) translateY\(-6px\)/,
  );
});

test('mobile navigation uses animated panel with entrance and exit orchestration', () => {
  const nav = fs.readFileSync(
    path.join(__dirname, '../components/Navigation.tsx'),
    'utf8',
  );
  assert.match(
    nav,
    /<AnimatePresence\s+initial=\{false\}\s+onExitComplete=\{handleExitComplete\}>/,
  );
  assert.match(nav, /key="mobile-menu-panel"/);
  assert.match(nav, /className="mobile-menu-panel"/);
  assert.match(
    nav,
    /initial=\{\{[\s\S]*?opacity:\s*0[\s\S]*?y:\s*shouldReduceMotion \? 0 : -20/,
  );
  assert.match(nav, /animate=\{\{[\s\S]*?opacity:\s*1[\s\S]*?y:\s*0/);
  assert.match(
    nav,
    /exit=\{\{[\s\S]*?opacity:\s*0[\s\S]*?y:\s*shouldReduceMotion \? 0 : -20/,
  );
  assert.match(nav, /<MenuIcon open=\{menuOpen\} \/>/);
});

test('mobile navigation uses the shared button arrow', () => {
  const nav = fs.readFileSync(
    path.join(__dirname, '../components/Navigation.tsx'),
    'utf8',
  );
  const css = fs.readFileSync(
    path.join(__dirname, '../styles/globals.css'),
    'utf8',
  );
  assert.match(nav, /<TiltedArrow className="mobile-nav-arrow" \/>/);
  assert.doesNotMatch(css, /\.mobile-nav a::after\s*\{/);
  assert.match(css, /\.mobile-nav a:focus-visible \.mobile-nav-arrow/);
});

test('mobile header maintains z-index stacking above navigation overlay', () => {
  const css = fs.readFileSync(
    path.join(__dirname, '../styles/globals.css'),
    'utf8',
  );
  assert.match(css, /\.site-header\s*\{[^}]*z-index:\s*70/);
  assert.match(css, /\.mobile-menu-dialog\s*\{[^}]*z-index:\s*60/);
  assert.match(css, /\.mobile-menu-dialog\s*\{[^}]*top:\s*4rem/);
});

test('mobile appearance modal is presented as a bottom sheet with a handle', () => {
  const css = fs.readFileSync(
    path.join(__dirname, '../styles/globals.css'),
    'utf8',
  );
  const mobileMedia = css.slice(css.indexOf('@media (max-width: 760px)'));
  assert.match(css, /\.appearance-overlay\s*\{[^}]*position:\s*fixed/);
  assert.match(mobileMedia, /\.appearance-overlay\s*\{[^}]*align-items:\s*end/);
  assert.match(
    mobileMedia,
    /\.appearance-panel\s*\{[^}]*border-radius:\s*1\.5rem 1\.5rem 0 0/,
  );
  assert.match(
    mobileMedia,
    /\.appearance-panel::before\s*\{[^}]*width:\s*2\.75rem[^}]*border-radius:\s*999px/,
  );
  assert.match(
    mobileMedia,
    /\.appearance-panel-header\s*\{[^}]*padding:\s*1rem 1\.25rem 0\.75rem/,
  );
  assert.match(
    mobileMedia,
    /\.appearance-colors\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\)/,
  );
  assert.match(
    mobileMedia,
    /\.appearance-font-group\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\)/,
  );
});
