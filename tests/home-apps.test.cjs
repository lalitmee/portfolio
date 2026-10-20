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

test('homepage app feature lists both apps and links to the full apps page', () => {
  const feature = home.match(
    /<section\s+className="content-section app-feature"[\s\S]*?<\/section>/,
  )?.[0];

  assert.ok(feature, 'homepage app feature exists');
  assert.match(feature, /Markdown Previewer/);
  assert.match(feature, /JSON Assistant/);
  assert.match(feature, /href="\/apps\/markdown-preview\/"/);
  assert.match(feature, /href="\/apps\/json-assistant\/"/);
  assert.match(feature, /Browse all apps/);
  assert.match(feature, /href="\/apps\/"/);
  assert.match(feature, /app_slug:\s*'markdown-preview'/);
  assert.match(feature, /app_slug:\s*'json-assistant'/);
  assert.equal(
    (feature.match(/<Link\s+className="app-feature-row"/g) || []).length,
    2,
  );
  assert.doesNotMatch(feature, /<div className="app-feature-row">/);
  assert.doesNotMatch(feature, /className="app-feature-launch"/);
  assert.equal(
    (feature.match(/className="app-feature-arrow"/g) || []).length,
    2,
  );
  assert.match(
    styles,
    /\.app-feature-row:hover \.app-feature-arrow,\s*\.app-feature-row:focus-visible \.app-feature-arrow\s*\{[^}]*animation:\s*arrow-bounce-tilt/s,
  );
  assert.doesNotMatch(
    styles,
    /\.app-feature-row\s*\{[^}]*border(?:-radius)?:/s,
  );
});

test('app feature uses a dark surface with readable text in dark mode', () => {
  assert.match(
    styles,
    /\.dark \.app-feature\s*\{[^}]*background:\s*var\(--panel\)[^}]*color:\s*var\(--ink\)/s,
  );
});
