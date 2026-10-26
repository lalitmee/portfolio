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

test('playground page stays available through an accessible footer easter egg', () => {
  const page = fs.readFileSync(
    path.join(__dirname, '../pages/playground.tsx'),
    'utf8',
  );
  assert.match(
    page,
    /import InteractivePlayground from '\.\.\/components\/InteractivePlayground'/,
  );
  assert.match(
    page,
    /<InteractivePlayground\s+onExit=\{exitPlayground\}\s*\/>/,
  );

  const nav = fs.readFileSync(
    path.join(__dirname, '../components/Navigation.tsx'),
    'utf8',
  );
  assert.doesNotMatch(nav, /href:\s*['"]\/playground\/['"]/);

  const footer = fs.readFileSync(
    path.join(__dirname, '../components/Footer.tsx'),
    'utf8',
  );
  const footerLinks = footer.match(/const links = \[[\s\S]*?\];/)[0];
  assert.doesNotMatch(footerLinks, /Playground/);
  assert.match(footer, /new IntersectionObserver/);
  assert.match(footer, /aria-hidden={!playgroundVisible}/);
  assert.match(footer, /tabIndex={playgroundVisible \? 0 : -1}/);
  assert.match(footer, /href="\/playground\/"/);
  assert.match(footer, /className="playground-constellation"/);
  assert.doesNotMatch(footer, /▶/);
  assert.match(footer, /className="playground-tab-label"[^>]*>\s*PLAY\s*</);
  assert.match(
    footer,
    /className="playground-tab-full-label"[^>]*>\s*Playground\s*</,
  );

  const css = fs.readFileSync(
    path.join(__dirname, '../styles/globals.css'),
    'utf8',
  );
  assert.match(css, /\.playground-easter-egg\.is-visible\s*\{/);
  assert.match(css, /\.playground-easter-egg\s*\{[^}]*visibility: hidden/);
  const tabStyles = css.match(/\.playground-easter-egg\s*\{([^}]+)\}/)[1];
  assert.match(tabStyles, /left: 50%/);
  assert.match(tabStyles, /transform: translate\(-50%, calc\(100% \+ 1rem\)\)/);
  assert.match(tabStyles, /transform 420ms cubic-bezier\(0\.22, 1, 0\.36, 1\)/);
  assert.match(tabStyles, /width 320ms cubic-bezier\(0\.22, 1, 0\.36, 1\)/);
  const visibleTab = css.match(
    /\.playground-easter-egg\.is-visible\s*\{([^}]+)\}/,
  )[1];
  assert.match(visibleTab, /transform: translate\(-50%, 0\)/);
  assert.match(
    css,
    /\.playground-easter-egg::after[\s\S]*?playground-glint-sweep/,
  );
  assert.match(css, /\.playground-tab-label[\s\S]*?opacity: 0/);
  assert.match(css, /\.playground-tab-full-label[\s\S]*?opacity: 0/);
  assert.match(
    css,
    /animation: playground-glint-sweep 3\.6s ease-in-out infinite/,
  );
  assert.match(css, /@keyframes playground-glint-sweep/);
  assert.match(
    css,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.playground-easter-egg::after[\s\S]*?animation: none/,
  );
  assert.match(css, /\.playground-constellation-node/);
  assert.match(css, /@keyframes playground-constellation-pulse/);
  assert.match(css, /\.playground-easter-egg:hover \.playground-constellation/);
});

test('Play opens an immersive playground and requests fullscreen from the click', () => {
  const footer = fs.readFileSync(
    path.join(__dirname, '../components/Footer.tsx'),
    'utf8',
  );
  assert.match(footer, /onClick=\{\(event\) =>/);
  assert.match(footer, /document\.documentElement\.requestFullscreen/);

  const page = fs.readFileSync(
    path.join(__dirname, '../pages/playground.tsx'),
    'utf8',
  );
  assert.match(
    page,
    /className="page-width content-page playground-immersive"/,
  );

  const playground = fs.readFileSync(
    path.join(__dirname, '../components/InteractivePlayground.tsx'),
    'utf8',
  );
  assert.match(
    playground,
    /setIsFullscreen\(Boolean\(document\.fullscreenElement\)\)/,
  );
  assert.match(playground, /onExit\?: \(\) => void/);
  assert.match(playground, /aria-label=\{\s*onExit\s*\?\s*'Exit Playground'/s);

  const pageSource = fs.readFileSync(
    path.join(__dirname, '../pages/playground.tsx'),
    'utf8',
  );
  assert.match(pageSource, /router\.back\(\)/);
  assert.match(pageSource, /router\.push\('\/'\)/);
  assert.match(pageSource, /document\.exitFullscreen/);

  const css = fs.readFileSync(
    path.join(__dirname, '../styles/globals.css'),
    'utf8',
  );
  assert.match(css, /body:has\(\.playground-immersive\) \.site-header/);
  const immersiveStyles = css.match(
    /\.content-page\.playground-immersive\s*\{([^}]+)\}/,
  );
  assert.ok(immersiveStyles);
  assert.match(immersiveStyles[1], /min-height:\s*100dvh/);
  assert.match(immersiveStyles[1], /padding:\s*0/);
  assert.match(css, /\.playground-immersive \.playground-frame\s*\{/);
  assert.match(css, /@keyframes playground-stage-enter/);
});
