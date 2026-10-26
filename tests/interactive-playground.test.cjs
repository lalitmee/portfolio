const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

test('InteractivePlayground component defines canvas-based physics simulation with visibility, fullscreen, gear modal, and segmented toggles', () => {
  const file = fs.readFileSync(
    path.join(__dirname, '../components/InteractivePlayground.tsx'),
    'utf8',
  );
  assert.match(file, /<canvas/);
  assert.match(file, /IntersectionObserver/);
  assert.match(file, /useReducedMotion/);
  assert.match(file, /pointermove|onPointerMove/i);
  assert.match(file, /pointerdown|onPointerDown/i);

  // Fullscreen support
  assert.match(file, /requestFullscreen|is-fullscreen/);
  assert.match(file, /FullscreenIcon/);

  // Gear icon and Settings Modal
  assert.match(file, /GearIcon/);
  assert.match(file, /role="dialog"/);
  assert.match(file, /playground-modal/);

  // Segmented toggle with traveling layoutId pills
  assert.match(file, /segmented-toggle/);
  assert.match(file, /layoutId="mode-pill"/);
  assert.match(file, /layoutId="force-pill"/);
  assert.match(file, /layoutId="density-pill"/);
});

test('InteractivePlayground styles are defined with responsive height, fullscreen, modal, and segmented pill toggles', () => {
  const css = fs.readFileSync(
    path.join(__dirname, '../styles/globals.css'),
    'utf8',
  );
  assert.match(css, /\.playground-frame\s*\{/);
  assert.match(css, /\.playground-frame\.is-fullscreen/);
  assert.match(css, /\.playground-canvas\s*\{/);
  assert.match(css, /\.playground-modal-backdrop/);
  assert.match(css, /\.playground-modal\s*\{/);
  assert.match(css, /\.segmented-toggle/);
  assert.match(css, /\.segmented-active-pill/);

  const reducedMotion = css.slice(
    css.indexOf('@media (prefers-reduced-motion: reduce)'),
  );
  assert.match(reducedMotion, /\.playground-frame/);
});

test('Dedicated playground page features InteractivePlayground and navigation links to it', () => {
  const page = fs.readFileSync(
    path.join(__dirname, '../pages/playground.tsx'),
    'utf8',
  );
  assert.match(
    page,
    /import InteractivePlayground from '\.\.\/components\/InteractivePlayground'/,
  );
  assert.match(page, /<InteractivePlayground\s*\/>/);

  const nav = fs.readFileSync(
    path.join(__dirname, '../components/Navigation.tsx'),
    'utf8',
  );
  assert.match(nav, /href:\s*['"]\/playground\/['"]/);
});
