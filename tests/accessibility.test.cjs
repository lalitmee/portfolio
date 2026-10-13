const assert = require('node:assert/strict');
const { test } = require('node:test');
const { readFileSync } = require('node:fs');

const navigation = readFileSync('components/Navigation.tsx', 'utf8');
const styles = readFileSync('styles/globals.css', 'utf8');

test('brand accessible name includes its visible wordmark', () => {
  assert.match(navigation, /aria-label="LK\. Lalit Kumar home"/);
});

test('demo eyebrow uses ink color on the blue panel', () => {
  assert.match(styles, /\.demo-panel > \.demo-heading \.eyebrow\s*\{[^}]*color:\s*var\(--ink\)/);
});
