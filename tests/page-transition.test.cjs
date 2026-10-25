const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

test('page transition applies option A fade-and-lift motion and removes the prototype switcher', () => {
  const source = fs.readFileSync(
    path.join(__dirname, '../components/PageTransition.tsx'),
    'utf8',
  );
  const appSource = fs.readFileSync(
    path.join(__dirname, '../pages/_app.tsx'),
    'utf8',
  );

  // App uses the PageTransition component
  assert.match(
    appSource,
    /import PageTransition from '\.\.\/components\/PageTransition';/,
  );
  assert.match(
    appSource,
    /<PageTransition>\s*<Component \{\.\.\.pageProps\} \/>\s*<\/PageTransition>/,
  );

  // Option A motion values: entry y: 16, exit y: -8, with opacity fades
  assert.match(
    source,
    /initial=\{reducedMotion \? false : \{ opacity: 0, y: 16 \}\}/,
  );
  assert.match(source, /animate=\{\{ opacity: 1, y: 0 \}\}/);
  assert.match(
    source,
    /opacity: 0,\s*y: -8,\s*transition: \{ duration: 0\.14, ease: 'easeIn' \}/,
  );

  // Reduced motion support and timing
  assert.match(source, /useReducedMotion/);
  assert.match(
    source,
    /transition=\{\{ duration: reducedMotion \? 0 : 0\.24, ease: 'easeOut' \}\}/,
  );

  // Focus management on route change
  assert.match(
    source,
    /document\s*\.getElementById\('main-content'\)\s*\?\.focus/,
  );

  // No prototype switcher toolbar or controls
  assert.doesNotMatch(source, /Page transition prototype/);
  assert.doesNotMatch(source, /Horizontal slide/);
  assert.doesNotMatch(source, /Soft zoom/);
  assert.doesNotMatch(source, /<aside/);
  assert.doesNotMatch(source, /Replay/);
  assert.doesNotMatch(source, /variant/);
});
