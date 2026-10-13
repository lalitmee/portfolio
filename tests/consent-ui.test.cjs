const assert = require('node:assert/strict');
const { test } = require('node:test');
const { readFileSync } = require('node:fs');

const app = readFileSync('pages/_app.tsx', 'utf8');
const consent = readFileSync('components/AnalyticsConsent.tsx', 'utf8');
const styles = readFileSync('styles/globals.css', 'utf8');

test('consent banner inherits the shared Outfit font wrapper', () => {
  assert.match(
    app,
    /<div className=\{`\$\{outfit\.variable\} font-sans`\}>[\s\S]*<AnalyticsConsent \/>[\s\S]*<\/div>/,
  );
});

test('theme glyph has an explicit readable size', () => {
  assert.match(styles, /\.theme-toggle\s*\{[^}]*font-size:\s*1\.25rem/);
});

test('consent backdrop is decorative and the preference panel is fixed', () => {
  assert.match(consent, /className="consent-backdrop" aria-hidden="true"/);
  assert.match(styles, /\.consent-backdrop\s*\{[^}]*pointer-events:\s*none/);
  assert.match(styles, /\.consent-banner\s*\{[^}]*position:\s*fixed/);
});

test('homepage does not create a hidden overflow scroll container', () => {
  assert.doesNotMatch(styles, /\.home-page\s*\{[^}]*overflow:\s*hidden/);
});
