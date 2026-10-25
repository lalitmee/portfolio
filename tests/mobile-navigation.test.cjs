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
    /\.menu-toggle\[aria-expanded='true'\] \.menu-bar-top[\s\S]*?transform:\s*translateY\(6px\) rotate\(45deg\)/,
  );
  assert.match(
    css,
    /\.menu-toggle\[aria-expanded='true'\] \.menu-bar-middle[\s\S]*?opacity:\s*0/,
  );
  assert.match(
    css,
    /\.menu-toggle\[aria-expanded='true'\] \.menu-bar-bottom[\s\S]*?transform:\s*translateY\(-6px\) rotate\(-45deg\)/,
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
  assert.match(
    nav,
    /animate=\{\{[\s\S]*?opacity:\s*1[\s\S]*?y:\s*0/,
  );
  assert.match(
    nav,
    /exit=\{\{[\s\S]*?opacity:\s*0[\s\S]*?y:\s*shouldReduceMotion \? 0 : -20/,
  );
  assert.match(nav, /<MenuIcon open=\{menuOpen\} \/>/);
});
