const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const test = require('node:test');
require('./load-tsx.cjs');
const { createRequire } = require('node:module');
const path = require('node:path');

const {
  accents,
  defaultAppearance,
  fonts,
  headingFonts,
  accentInitScript,
} = require('../utils/appearance.ts');

test('Iris adds a new-color edge synchronized with its reveal and removes it', async () => {
  const ts = require('typescript');
  const animations = [];
  const edge = {
    style: {},
    remove() {
      this.removed = true;
    },
  };
  let finish;
  let color = 'blue';
  const root = {
    dataset: {},
    animate(frames, options) {
      animations.push({ frames, options });
    },
  };
  const exports = {};
  vm.runInNewContext(
    ts.transpileModule(fs.readFileSync('utils/appearance-motion.ts', 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS },
    }).outputText,
    {
      exports,
      require: () => ({ flushSync: (update) => update() }),
      process: { env: { NODE_ENV: 'production' } },
      URLSearchParams,
      window: {
        location: { search: '' },
        matchMedia: () => ({ matches: false }),
      },
      innerWidth: 1000,
      innerHeight: 800,
      document: {
        documentElement: root,
        createElement: () => edge,
        body: {
          append() {
            edge.color = color;
          },
        },
        startViewTransition(update) {
          update();
          return {
            ready: Promise.resolve(),
            finished: new Promise((resolve) => {
              finish = resolve;
            }),
          };
        },
      },
    },
  );
  exports.animateAppearanceChange(
    {
      nativeEvent: { detail: 1, clientX: 100, clientY: 80 },
      currentTarget: {
        getBoundingClientRect: () => ({
          left: 0,
          top: 0,
          width: 20,
          height: 20,
        }),
      },
    },
    () => {
      color = 'violet';
    },
  );
  await Promise.resolve();
  assert.equal(edge.color, 'violet');
  assert.equal(animations.length, 2);
  assert.equal(edge.style.borderWidth, '6px');
  assert.equal(animations[0].options.duration, 1100);
  assert.equal(animations[0].options.easing, 'ease-in-out');
  assert.equal(animations[1].frames[1].opacity, 1);
  assert.equal(animations[1].frames[1].offset, 0.75);
  assert.equal(animations[1].options.duration, animations[0].options.duration);
  assert.equal(animations[1].options.easing, animations[0].options.easing);
  finish();
  await Promise.resolve();
  assert.equal(edge.removed, true);
  animations.length = 0;
  edge.color = undefined;
  exports.animateAppearanceChange(
    {
      nativeEvent: { detail: 1, clientX: 100, clientY: 80 },
      currentTarget: {
        getBoundingClientRect: () => ({
          left: 0,
          top: 0,
          width: 20,
          height: 20,
        }),
      },
    },
    () => {
      color = 'blue';
    },
    'theme',
  );
  await Promise.resolve();
  assert.equal(animations.length, 1, 'theme Iris has no ring');
  assert.equal(edge.color, undefined);
  assert.equal(animations[0].options.duration, 650);
  assert.equal(animations[0].options.easing, 'cubic-bezier(.22,1,.36,1)');
  finish();
  await Promise.resolve();
});

test('decorative accent tokens follow the selected palette in both themes', () => {
  const css = fs.readFileSync('styles/globals.css', 'utf8');
  for (const selector of [':root', '.dark']) {
    const block = css.slice(css.indexOf(`${selector} {`)).split('}')[0];
    assert.match(block, /--ochre: var\(--blue\)/);
  }
});

function initialize(value, blocked = false) {
  const properties = {};
  const root = {
    dataset: {},
    style: { setProperty: (key, value) => (properties[key] = value) },
  };
  vm.runInNewContext(accentInitScript, {
    document: { documentElement: root },
    localStorage: {
      getItem: () => {
        if (blocked) throw Error('blocked');
        return value;
      },
    },
  });
  return { root, properties };
}

function luminance(hex) {
  const values = hex.match(/[a-f\d]{2}/gi).map((part) => {
    const value = parseInt(part, 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
}

test('appearance preferences restore before rendering with safe defaults', () => {
  assert.deepEqual(defaultAppearance, {
    theme: 'dark',
    accent: 'blue',
    headingFont: 'georgia',
    bodyFont: 'outfit',
  });
  assert.deepEqual(
    accents.map(({ name }) => name),
    ['Blue', 'Teal', 'Violet', 'Terracotta', 'Berry', 'Amber'],
  );
  for (const accent of accents) {
    const { root, properties } = initialize(accent.id);
    assert.equal(root.dataset.accent, accent.id);
    assert.equal(properties['--accent-light'], accent.light);
    assert.equal(properties['--accent-dark'], accent.dark);
  }
  for (const value of [null, '', 'invalid', 'constructor']) {
    assert.equal(initialize(value).root.dataset.accent, 'blue');
  }
  assert.equal(initialize(null, true).root.dataset.accent, 'blue');
  assert.deepEqual(
    fonts.map(({ name }) => name),
    ['Outfit', 'Inter', 'Geist Sans', 'IBM Plex Sans', 'System', 'Manrope'],
  );
  assert.deepEqual(
    headingFonts.map(({ name }) => name),
    [
      'Georgia',
      'Playfair Display',
      'DM Serif Display',
      'Lora',
      'Libre Baskerville',
      'Cormorant Garamond',
    ],
  );
  for (const font of fonts) {
    assert.equal(initialize(font.id).root.dataset.bodyFont, font.id);
  }
  for (const font of headingFonts) {
    assert.equal(initialize(font.id).root.dataset.headingFont, font.id);
  }
  for (const value of [null, '', 'invalid', 'constructor']) {
    assert.equal(initialize(value).root.dataset.bodyFont, 'outfit');
    assert.equal(initialize(value).root.dataset.headingFont, 'georgia');
  }
  const document = fs.readFileSync('pages/_document.tsx', 'utf8');
  assert.match(document, /<Head>[\s\S]*accentInitScript[\s\S]*<body>/);
  const app = fs.readFileSync('pages/_app.tsx', 'utf8');
  assert.match(app, /defaultTheme="dark"/);
});

test('selected application fonts also control large display and section headings', () => {
  const css = fs.readFileSync('styles/globals.css', 'utf8');
  assert.match(
    css,
    /\.home-hero h1,[\s\S]*?font-family: var\(--font-heading\)/,
  );
  assert.match(
    css,
    /\.content-page > h1 \{[\s\S]*?font-family: var\(--font-heading\)/,
  );
  assert.match(
    css,
    /\.content-page section h2,[\s\S]*?font-family: var\(--font-heading\)/,
  );
  assert.match(
    css,
    /data-heading-font='georgia'[\s\S]*?Georgia, 'Times New Roman', serif/,
  );
  assert.match(
    css,
    /data-body-font='outfit'[\s\S]*?font-family: var\(--font-outfit\)/,
  );
  for (const variable of [
    '--font-playfair-display',
    '--font-dm-serif-display',
    '--font-lora',
    '--font-libre-baskerville',
    '--font-cormorant-garamond',
    '--font-manrope',
  ]) {
    assert.match(css, new RegExp(variable));
  }
  const app = fs.readFileSync('pages/_app.tsx', 'utf8');
  assert.match(app, /Playfair_Display/);
  assert.match(app, /DM_Serif_Display/);
  assert.match(app, /Libre_Baskerville/);
  assert.match(app, /Cormorant_Garamond/);
  assert.match(app, /Manrope/);
});

test('accent text meets AA contrast on both theme surfaces', () => {
  for (const accent of accents) {
    for (const [shade, surfaces] of [
      [accent.light, ['#f7f4ec', '#eeeadf']],
      [accent.dark, ['#121923', '#1b2531']],
    ]) {
      for (const surface of surfaces) {
        const levels = [luminance(shade), luminance(surface)].sort(
          (a, b) => b - a,
        );
        assert.ok(
          (levels[0] + 0.05) / (levels[1] + 0.05) >= 4.5,
          `${accent.id} on ${surface}`,
        );
      }
    }
  }
});

test('appearance controls are present beside both theme toggles with native keyboard options', () => {
  const navigation = fs.readFileSync('components/Navigation.tsx', 'utf8');
  assert.equal((navigation.match(/<AppearanceMenu \/>/g) || []).length, 2);
  const menu = fs.readFileSync('components/AppearanceMenu.tsx', 'utf8');
  assert.match(menu, /aria-expanded=/);
  assert.match(menu, /role="dialog"/);
  assert.match(menu, /aria-modal="true"/);
  assert.match(menu, /role="tablist"/);
  assert.match(menu, /layoutId=\{`\$\{id\}-tab-selection`\}/);
  assert.match(menu, /<legend>Accent color<\/legend>/);
  assert.match(menu, /<strong>Headings<\/strong>/);
  assert.match(menu, /<strong>Body text<\/strong>/);
  assert.match(menu, /type="radio"/);
  assert.match(menu, /event.key === 'Escape'/);
  assert.match(menu, /stopPropagation\(\)/);
  assert.match(menu, /trigger.current\?\.focus\(\{ preventScroll: true \}\)/);
  assert.match(menu, /localStorage.setItem\('body-font', font.id\)/);
  assert.match(menu, /localStorage.setItem\('heading-font', font.id\)/);
  assert.match(menu, /root\.dataset\.bodyFont = font\.id/);
  assert.match(menu, /root\.dataset\.headingFont = font\.id/);
  assert.match(menu, /window.dispatchEvent\(new Event\('font-change'\)\)/);
  assert.match(menu, /Reset defaults/);
  assert.match(menu, /setTheme\(defaultAppearance\.theme\)/);
  assert.match(menu, /localStorage\.removeItem\(key\)/);
  assert.match(menu, /layoutId=\{`\$\{id\}-accent-selection`\}/);
  assert.match(menu, /layoutId=\{`\$\{id\}-body-font-selection`\}/);
  assert.match(menu, /layoutId=\{`\$\{id\}-heading-font-selection`\}/);
  assert.match(menu, /--option-accent-light/);
  assert.match(menu, /--option-accent-dark/);
  assert.match(menu, /className="font-sample font-heading-sample"/);
  assert.match(menu, /className="font-sample font-body-sample"/);
  assert.doesNotMatch(
    fs.readFileSync('utils/appearance.ts', 'utf8'),
    /headingFonts[\s\S]*\.\.\.fonts/,
  );
  const css = fs.readFileSync('styles/globals.css', 'utf8');
  assert.match(css, /\.appearance-overlay\s*\{[^}]*place-items:\s*center/);
  assert.match(
    css,
    /\.appearance-tabs\s*\{[^}]*grid-template-columns:\s*repeat\(3,/,
  );
  assert.match(
    css,
    /\.appearance-tab-selection\s*\{[^}]*background:\s*color-mix/,
  );
  assert.match(css, /\.appearance-color-option\s*\{[^}]*--option-accent:/);
  assert.match(
    css,
    /\.appearance-color-selection\s*\{[^}]*border-color:\s*color-mix/,
  );
  assert.match(css, /\.appearance-option\s*\{[^}]*padding:\s*0\.75rem 1rem/);
  assert.match(
    css,
    /@media \(min-width: 761px\)[\s\S]*?\.appearance-panel\s*\{[^}]*height:\s*min\(40rem, calc\(100dvh - 3rem\)\)/,
  );
  assert.match(css, /\.appearance-option > span:not\(\.appearance-selection\)/);
  assert.match(
    css,
    /\.appearance-font-panel\s*\{[^}]*padding-right:\s*0\.5rem/,
  );
  assert.match(
    css,
    /\.appearance-font-group\s*\{[^}]*grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/,
  );
  assert.match(
    css,
    /\.appearance-footer\s*\{[^}]*justify-content:\s*space-between[^}]*border-top:\s*1px solid var\(--line\)/,
  );
});

test('appearance panel uses responsive entry and exit motion without leaving closing options interactive', () => {
  const menu = fs.readFileSync('components/AppearanceMenu.tsx', 'utf8');
  assert.match(menu, /window\.matchMedia\('\(max-width: 760px\)'\)/);
  assert.match(menu, /isMobile[\s\S]*?\{ opacity: 0, y: '100%' \}/);
  assert.match(menu, /\{ opacity: 0, y: 16, scale: 0\.975 \}/);
  assert.match(menu, /type: 'spring' as const/);
  assert.match(menu, /stiffness: isMobile \? 360 : 420/);
  assert.match(menu, /y: '100%'[\s\S]*?duration: 0\.24/);
  assert.match(menu, /scale: 0\.985/);
  assert.match(menu, /onExitComplete=/);
  assert.match(menu, /inert=\{!open\} aria-hidden=\{!open\}/);
});

test('appearance modal tabs, accent selection, and close behavior remain interactive', () => {
  const ts = require('typescript');
  const updates = [];
  let focused = false;
  let focusOptions;
  let focusedTab;
  let resetTheme;
  const removedPreferences = [];
  const root = { dataset: {}, style: { setProperty() {} } };
  const module = { exports: {} };
  const { outputText } = ts.transpileModule(
    fs.readFileSync('components/AppearanceMenu.tsx', 'utf8'),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
      },
    },
  );
  vm.runInNewContext(outputText, {
    exports: module.exports,
    document: { documentElement: root },
    localStorage: {
      setItem() {},
      removeItem: (key) => removedPreferences.push(key),
    },
    window: { dispatchEvent() {} },
    Event,
    require: (name) =>
      name === 'react-dom'
        ? { createPortal: (children) => children }
        : name === 'react'
          ? {
              useId: () => 'appearance-test',
              useRef: () => ({
                current: {
                  contains: () => false,
                  querySelector: (selector) => ({
                    focus: () => (focusedTab = selector),
                  }),
                  focus: (options) => {
                    focused = true;
                    focusOptions = options;
                  },
                },
              }),
              useState: (initial) => [
                initial === false ? true : initial,
                (value) => updates.push(value),
              ],
              useEffect: () => {},
            }
          : name === 'next-themes'
            ? {
                useTheme: () => ({ setTheme: (theme) => (resetTheme = theme) }),
              }
            : name === 'framer-motion'
              ? {
                  motion: { div: 'div', span: 'span' },
                  AnimatePresence: 'presence',
                  useReducedMotion: () => false,
                }
              : name === '../utils/appearance-motion'
                ? { animateAppearanceChange: (_event, update) => update() }
                : createRequire(path.resolve('components/AppearanceMenu.tsx'))(
                    name,
                  ),
  });
  const menu = module.exports.default();
  const presence = menu.props.children[1].props.children;
  const panel = presence.props.children.props.children;
  assert.equal(panel.props.role, 'dialog');
  assert.equal(panel.props['aria-modal'], 'true');
  const tabs = panel.props.children[1];
  const tabButtons = tabs.props.children;
  assert.deepEqual(
    Array.from(tabButtons, ({ props }) => props.id),
    [
      'appearance-test-colors-tab',
      'appearance-test-heading-font-tab',
      'appearance-test-body-font-tab',
    ],
  );
  assert.deepEqual(
    Array.from(
      tabButtons,
      ({ props }) =>
        props.children.find(
          (child) => child?.props?.className === 'appearance-tab-label',
        ).props.children,
    ),
    ['Colors', 'Heading font', 'Body font'],
  );
  const [colorsPanel, headingFontPanel, bodyFontPanel] =
    panel.props.children.slice(2, 5);
  assert.deepEqual(
    Array.from(tabButtons, ({ props }) => props['aria-controls']),
    [colorsPanel.props.id, headingFontPanel.props.id, bodyFontPanel.props.id],
  );
  assert.deepEqual(
    [
      colorsPanel.props.hidden,
      headingFontPanel.props.hidden,
      bodyFontPanel.props.hidden,
    ],
    [false, true, true],
  );
  tabButtons[1].props.onClick();
  tabButtons[2].props.onClick();
  assert.deepEqual(updates, ['heading-font', 'body-font']);
  let prevented = false;
  tabButtons[0].props.onKeyDown({
    key: 'ArrowLeft',
    preventDefault: () => (prevented = true),
  });
  assert.equal(prevented, true);
  assert.deepEqual(updates, ['heading-font', 'body-font', 'body-font']);
  assert.equal(focusedTab, '[id="appearance-test-body-font-tab"]');
  tabButtons[0].props.onKeyDown({ key: 'ArrowRight', preventDefault() {} });
  assert.deepEqual(updates, [
    'heading-font',
    'body-font',
    'body-font',
    'heading-font',
  ]);
  assert.equal(focusedTab, '[id="appearance-test-heading-font-tab"]');
  updates.length = 0;
  tabButtons[1].props.onClick();
  assert.deepEqual(updates, ['heading-font'], 'heading tab is selectable');
  const fieldset = colorsPanel.props.children;
  const violet = fieldset.props.children[1][2];
  violet.props.children
    .find((child) => child?.props?.type === 'radio')
    .props.onChange({
      currentTarget: {},
      nativeEvent: {},
    });
  assert.deepEqual(
    updates,
    ['heading-font'],
    'accent selection does not dismiss the modal',
  );
  const footer = panel.props.children[5];
  footer.props.children[1].props.onClick({
    currentTarget: {},
    nativeEvent: {},
  });
  assert.equal(resetTheme, 'dark');
  assert.equal(root.dataset.accent, 'blue');
  assert.equal(root.dataset.bodyFont, 'outfit');
  assert.equal(root.dataset.headingFont, 'georgia');
  assert.deepEqual(removedPreferences, [
    'theme',
    'accent',
    'font',
    'body-font',
    'heading-font',
  ]);
  const panelHeader = panel.props.children[0];
  panelHeader.props.children[1].props.onClick();
  assert.deepEqual(
    updates,
    ['heading-font', false],
    'close dismisses the modal',
  );
  assert.equal(focused, false, 'focus waits for the exit animation');
  presence.props.onExitComplete();
  assert.equal(focused, true, 'focus returns after the exit animation');
  assert.equal(focusOptions?.preventScroll, true);
});
