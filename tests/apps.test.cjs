const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const nextConfig = require('../next.config.js');

const page = fs.readFileSync(
  path.join(__dirname, '../pages/apps/index.tsx'),
  'utf8',
);
const styles = fs.readFileSync(
  path.join(__dirname, '../styles/globals.css'),
  'utf8',
);

test('JSON Assistant has a same-origin app proxy route', async () => {
  const rewrites = await nextConfig.rewrites();

  assert.ok(
    rewrites.some(
      ({ source, destination }) =>
        source === '/apps/json-assistant/:path*' &&
        destination === 'https://json-assistant-one.vercel.app/:path*',
    ),
  );
});

test('apps page lists JSON Assistant with its privacy note and tracked launch', () => {
  assert.match(page, /JSON Assistant/);
  assert.match(page, /Code, Tree, and Split/);
  assert.match(page, /not uploaded/);
  assert.match(page, /href="\/apps\/json-assistant\/"/);
  assert.match(page, /app_slug:\s*'json-assistant'/);
});

test('apps listing uses local README screenshots beside each app description', () => {
  assert.match(page, /src="\/images\/apps\/markdown-previewer\.png"/);
  assert.match(page, /alt="Markdown Previewer app screenshot"/);
  assert.match(page, /src="\/images\/apps\/json-assistant\.png"/);
  assert.match(page, /alt="JSON Assistant app screenshot"/);
  assert.equal(
    (page.match(/className="app-listing-preview"/g) || []).length,
    2,
  );
  assert.equal(
    (page.match(/className="app-listing-preview-frame"/g) || []).length,
    2,
  );
  assert.match(
    styles,
    /\.app-listing\s*\{[^}]*grid-template-columns:\s*40% minmax\(0, 1fr\) auto/s,
  );
  assert.match(
    styles,
    /\.app-listing-preview-frame:hover \.app-listing-preview,\s*\.app-listing:focus-visible \.app-listing-preview\s*\{[^}]*transform:\s*scale\(1\.05\)/s,
  );
  assert.match(
    styles.slice(styles.indexOf('@media (prefers-reduced-motion: reduce)')),
    /\.app-listing-preview-frame:hover \.app-listing-preview,[\s\S]*?transform:\s*none !important/s,
  );
});

test('each apps listing card is one accessible link with tracked launch', () => {
  const listings =
    page.match(/<Link\s+className="app-listing"[\s\S]*?<\/Link>/g) || [];

  assert.equal(listings.length, 2);
  assert.match(listings[0], /href="\/apps\/markdown-preview\/"/);
  assert.match(listings[0], /aria-label="Open Markdown Previewer"/);
  assert.match(listings[0], /app_slug:\s*'markdown-preview'/);
  assert.match(listings[1], /href="\/apps\/json-assistant\/"/);
  assert.match(listings[1], /aria-label="Open JSON Assistant"/);
  assert.match(listings[1], /app_slug:\s*'json-assistant'/);
  assert.equal((page.match(/className="app-launch"/g) || []).length, 2);
  assert.doesNotMatch(page, /<section className="app-listing">/);
});

test('apps use accessible tilted arrow launch controls with reduced-motion support', () => {
  const reducedMotion = styles.slice(
    styles.indexOf('@media (prefers-reduced-motion: reduce)'),
  );

  assert.equal((page.match(/className="app-launch"/g) || []).length, 2);
  assert.match(page, /aria-label="Open Markdown Previewer"/);
  assert.match(page, /aria-label="Open JSON Assistant"/);
  assert.equal((page.match(/className="app-listing"/g) || []).length, 2);
  assert.equal(
    (
      page.match(
        /<MdArrowOutward className="app-launch-arrow" aria-hidden="true" \/>/g,
      ) || []
    ).length,
    2,
  );
  assert.doesNotMatch(styles, /\.app-launch\s*\{[^}]*border(?:-radius)?:/s);
  assert.match(
    styles,
    /\.app-listing:hover \.app-launch-arrow,\s*\.app-listing:focus-within \.app-launch-arrow\s*\{[^}]*animation:\s*arrow-bounce-tilt/s,
  );
  assert.match(reducedMotion, /\.app-listing:hover \.app-launch-arrow/);
  assert.match(
    reducedMotion,
    /\.app-feature-row:focus-visible \.app-feature-arrow/,
  );
  assert.match(reducedMotion, /animation:\s*none !important/);
});
