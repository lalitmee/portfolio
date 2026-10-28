const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

test('AmbientGlow component renders an aria-hidden overlay with fine-pointer tracking', () => {
  const file = fs.readFileSync(
    path.join(__dirname, '../components/AmbientGlow.tsx'),
    'utf8',
  );
  assert.match(file, /aria-hidden="true"/);
  assert.match(file, /pointermove/);
  assert.match(file, /--cursor-x/);
  assert.match(file, /--cursor-y/);
  assert.match(file, /pointer:\s*fine/);
});

test('ambient-glow styles define non-blocking radial accent gradient with reduced-motion fallback', () => {
  const css = fs.readFileSync(
    path.join(__dirname, '../styles/globals.css'),
    'utf8',
  );
  assert.match(css, /\.ambient-glow\s*\{[^}]*pointer-events:\s*none/);
  assert.match(css, /\.ambient-glow\s*\{[^}]*position:\s*fixed/);
  assert.match(css, /\.ambient-glow\s*\{[^}]*radial-gradient/);
  const reducedMotion = css.slice(
    css.indexOf('@media (prefers-reduced-motion: reduce)'),
  );
  assert.match(reducedMotion, /\.ambient-glow\s*\{[^}]*display:\s*none/);
});

test('AmbientGlow is mounted in _app.tsx', () => {
  const app = fs.readFileSync(path.join(__dirname, '../pages/_app.tsx'), 'utf8');
  assert.match(app, /import AmbientGlow from '\.\.\/components\/AmbientGlow'/);
  assert.match(app, /<AmbientGlow\s*\/>/);
});
