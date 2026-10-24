const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const home = fs.readFileSync(
  path.join(__dirname, '../pages/index.tsx'),
  'utf8',
);
const styles = fs.readFileSync(
  path.join(__dirname, '../styles/globals.css'),
  'utf8',
);

test('homepage features only the shared HN selection with separate actions', () => {
  const feature = home.match(
    /<section\s+className="content-section app-feature"[\s\S]*?<\/section>/,
  )?.[0];

  assert.ok(feature, 'homepage app feature exists');
  assert.match(feature, /featuredApp\.name/);
  assert.match(feature, /featuredApp\.slug/);
  assert.match(feature, /featuredApp\.liveUrl/);
  assert.match(feature, /Read the story/);
  assert.match(feature, /Open app/);
  assert.doesNotMatch(
    feature,
    /Markdown Previewer|JSON Assistant|markdown-preview|json-assistant/,
  );
  assert.match(feature, /Browse all apps/);
  assert.match(feature, /href="\/apps\/"/);
  assert.match(feature, /app_slug:\s*featuredApp\.slug/);
  assert.match(feature, /<article className="app-feature-row">/);
});

test('app feature follows the active theme without an inverted palette', () => {
  assert.match(
    styles,
    /(?:^|\n)\.app-feature\s*\{[^}]*background:\s*var\(--paper\)[^}]*color:\s*var\(--ink\)/s,
  );
  assert.match(
    styles,
    /(?:^|\n)\.app-feature\s*\{[^}]*border-top:\s*1px solid var\(--line\)/s,
  );
  assert.match(styles, /\.section-tint\s*\{[^}]*background:\s*var\(--panel\)/s);
  assert.match(
    styles,
    /(?:^|\n)\.app-feature \.eyebrow\s*\{[^}]*color:\s*var\(--blue\)/s,
  );
  assert.match(
    styles,
    /\.app-feature-intro,\s*\.app-feature-row p\s*\{[^}]*color:\s*var\(--muted\)/s,
  );
  assert.doesNotMatch(styles, /\.dark \.app-feature/);
});
