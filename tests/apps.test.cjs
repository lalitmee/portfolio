const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const nextConfig = require('../next.config.js');

test('app records publish three verified destinations and reject unknown slugs', () => {
  assert.ok(
    fs.existsSync(path.join(__dirname, '../data/apps.ts')),
    'app records exist',
  );
  const { apps, featuredApp, getApp } = require('../data/apps.ts');
  assert.deepEqual(
    apps.map((app) => app.slug),
    ['hn-revamped', 'markdown-preview', 'json-assistant'],
  );
  assert.equal(new Set(apps.map((app) => app.slug)).size, 3);
  assert.equal(featuredApp, apps[0]);
  assert.equal(getApp('hn-revamped'), apps[0]);
  for (const slug of ['unknown', undefined, ['hn-revamped']])
    assert.equal(getApp(slug), undefined);
  assert.deepEqual(
    apps.map((app) => app.liveUrl),
    [
      'https://hn-revamped.vercel.app/',
      'https://markdown-assistant.vercel.app/',
      'https://json-assistant-one.vercel.app/',
    ],
  );
  for (const app of apps) {
    assert.ok(
      fs.existsSync(path.join(__dirname, '../public', app.screenshot.src)),
    );
    assert.ok(app.screenshot.width > 0 && app.screenshot.height > 0);
    assert.ok(app.motivation);
    assert.match(app.sourceUrl, /^https:\/\/github.com\/lalitmee\//);
  }
  assert.match(apps[1].motivation, /LLM-assisted and agentic coding/);
});

test('app roots are local stories, not external proxies or redirects', async () => {
  const rewrites = (await nextConfig.rewrites?.()) ?? [];
  assert.ok(!rewrites.some((rule) => rule.source.startsWith('/apps/')));
  const redirects = (await nextConfig.redirects?.()) ?? [];
  assert.ok(!redirects.some((rule) => rule.source.startsWith('/apps/')));
});

test('app detail statically generates known stories with ongoing-project copy', () => {
  const file = path.join(__dirname, '../pages/apps/[slug].tsx');
  assert.ok(fs.existsSync(file), 'app detail route exists');
  const page = fs.readFileSync(file, 'utf8');
  for (const expression of [
    /getStaticPaths/,
    /getStaticProps/,
    /apps\.map/,
    /fallback: false/,
    /getApp\(params\?\.slug\)/,
    /notFound: true/,
    /Actively evolving/,
    /This is an ongoing project/,
    /All apps/,
    /View source/,
  ])
    assert.match(page, expression);
});

test('directory renders separate story and launch actions from shared records', () => {
  const page = fs.readFileSync(
    path.join(__dirname, '../pages/apps/index.tsx'),
    'utf8',
  );
  assert.match(page, /apps\.map/);
  assert.match(page, /<article className="app-listing"/);
  assert.match(page, /href=\{app\.liveUrl\}/);
  assert.match(page, /Read the story/);
  assert.match(page, /Open app/);
  assert.match(page, /target="_blank"/);
  assert.match(page, /rel="noreferrer"/);
  assert.match(page, /src=\{app\.screenshot\.src\}/);
  assert.doesNotMatch(page, /keep your files and data in your browser/);
});

test('hovering anywhere on an app card zooms its screenshot', () => {
  const styles = fs.readFileSync(
    path.join(__dirname, '../styles/globals.css'),
    'utf8',
  );
  assert.match(
    styles,
    /\.app-listing:hover \.app-listing-preview,[\s\S]*?transform:\s*scale\(1\.05\)/,
  );
});

test('card launch actions use the detail-page button treatment, distinct from story links', () => {
  for (const file of ['pages/index.tsx', 'pages/apps/index.tsx']) {
    const page = fs.readFileSync(file, 'utf8');
    const launch = (page.match(/<a\b[\s\S]*?<\/a>/g) ?? []).find((anchor) =>
      anchor.includes('app_launch'),
    );
    assert.match(launch, /className="button button-outline section-button"/);
    assert.match(launch, /onPointerEnter=/);
    assert.match(launch, /<ExternalLinkIcon aria-hidden="true"/);
    assert.match(launch, /className="section-button-fill" aria-hidden="true"/);
    assert.match(page, /<Link\s+className="text-link"[\s\S]*?Read the story/);
  }
});

test('only external launch anchors track app_launch, never story links', () => {
  for (const file of [
    'pages/index.tsx',
    'pages/apps/index.tsx',
    'pages/apps/[slug].tsx',
  ]) {
    const page = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
    const links = page.match(/<Link\b[\s\S]*?<\/Link>/g) ?? [];
    for (const link of links) assert.doesNotMatch(link, /app_launch|<a\b/);
    const launches = (page.match(/<a\b[\s\S]*?<\/a>/g) ?? []).filter((anchor) =>
      anchor.includes('app_launch'),
    );
    assert.equal(launches.length, 1, file);
    assert.match(launches[0], /href=\{(?:app|featuredApp)\.liveUrl\}/);
    assert.match(launches[0], /target="_blank"/);
  }
});

test('app actions retain decorative arrows and reduced motion', () => {
  const styles = fs.readFileSync(
    path.join(__dirname, '../styles/globals.css'),
    'utf8',
  );
  assert.match(styles, /\.app-detail-preview\s*\{[^}]*height:\s*auto/s);
  assert.match(styles, /\.app-actions a:focus-visible \.app-launch-arrow/);
  assert.match(
    styles.slice(styles.indexOf('@media (prefers-reduced-motion: reduce)')),
    /animation:\s*none !important/,
  );
});

test('app detail has section icons and a scroll-revealed action dock', () => {
  const page = fs.readFileSync('pages/apps/[slug].tsx', 'utf8');
  for (const icon of [
    'BulbIcon',
    'WidgetsIcon',
    'SlidersIcon',
    'ConstructionIcon',
  ])
    assert.match(page, new RegExp(`<${icon} aria-hidden="true"`));
  assert.match(page, /className="detail-actions app-detail-actions"/);
  const css = fs.readFileSync('styles/globals.css', 'utf8');
  assert.doesNotMatch(css, /\.app-detail-actions\s*\{[^}]*position: sticky/);
  assert.match(css, /\.app-action-dock\s*\{[^}]*position: fixed/);
  assert.match(
    page,
    /addEventListener\('scroll', syncDock, \{ passive: true \}\)/,
  );
  assert.match(page, /getBoundingClientRect\(\).bottom/);
  assert.match(page, /<ExternalLinkIcon aria-hidden="true"/);
  assert.match(page, /<GithubIcon aria-hidden="true"/);
  assert.match(page, /<AnimatePresence/);
});

test('narrow mobile dock uses named icon-only links with touch-sized targets', () => {
  const page = fs.readFileSync('pages/apps/[slug].tsx', 'utf8');
  assert.match(page, /aria-label="Open app"/);
  assert.match(page, /aria-label="View source"/);
  const css = fs.readFileSync('styles/globals.css', 'utf8');
  assert.match(
    css,
    /@media \(max-width: 359px\)[\s\S]*\.app-dock-links \.app-action-label\s*\{\s*display: none/,
  );
  assert.match(
    css,
    /@media \(max-width: 359px\)[\s\S]*min-width: 44px;[\s\S]*min-height: 44px;/,
  );
});

test('mobile view buttons display accent borders by default and preserve inline action grouping with compact spacing', () => {
  const css = fs.readFileSync('styles/globals.css', 'utf8');
  const mobileBlock = css.slice(css.indexOf('@media (max-width: 760px)'));
  assert.match(
    mobileBlock,
    /a\.text-link\s*\{[^}]*border-color:\s*var\(--blue\)/,
  );
  assert.match(mobileBlock, /a\.text-link::before\s*\{[^}]*display:\s*none/);
  assert.match(
    mobileBlock,
    /\.button-outline\s*\{[^}]*border-color:\s*var\(--blue\)/,
  );
  assert.match(
    mobileBlock,
    /\.button,\s*a\.text-link\s*\{[^}]*font-size:\s*0\.875rem/,
  );
  assert.match(
    mobileBlock,
    /\.app-actions,\s*\.hero-actions,\s*\.resume-actions,\s*\.detail-actions\s*\{[^}]*gap:\s*0\.5rem 0\.65rem/,
  );
  const narrowMobile = css.slice(css.indexOf('@media (max-width: 420px)'));
  assert.doesNotMatch(
    narrowMobile,
    /\.hero-actions\s*\{[^}]*flex-direction:\s*column/,
  );
});
