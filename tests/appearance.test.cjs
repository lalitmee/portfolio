const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const test = require('node:test');
require('./load-tsx.cjs');
const { createRequire } = require('node:module');
const path = require('node:path');

const { accents, accentInitScript } = require('../utils/appearance.ts');

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

test('five named accent presets restore before rendering with safe blue fallback', () => {
  assert.deepEqual(
    accents.map(({ name }) => name),
    ['Blue', 'Teal', 'Violet', 'Terracotta', 'Berry'],
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
  const document = fs.readFileSync('pages/_document.tsx', 'utf8');
  assert.match(document, /<Head>[\s\S]*accentInitScript[\s\S]*<body>/);
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
  assert.match(menu, /<legend>Accent color<\/legend>/);
  assert.match(menu, /type="radio"/);
  assert.match(menu, /event.key === 'Escape'/);
  assert.match(menu, /stopPropagation\(\)/);
  assert.match(menu, /trigger.current\?\.focus\(\)/);
});

test('appearance panel animates entry and exit without leaving closing options interactive', () => {
  const menu = fs.readFileSync('components/AppearanceMenu.tsx', 'utf8');
  assert.match(menu, /<AnimatePresence initial=\{false\}>/);
  assert.match(
    menu,
    /initial=\{\{ opacity: 0, y: shouldReduceMotion \? 0 : -6 \}\}/,
  );
  assert.match(
    menu,
    /exit=\{\{ opacity: 0, y: shouldReduceMotion \? 0 : -6 \}\}/,
  );
  assert.match(menu, /duration: shouldReduceMotion \? 0 : 0\.15/);
  assert.match(menu, /inert=\{!open\} aria-hidden=\{!open\}/);
});

test('label pointer blur does not dismiss appearance before its radio click', () => {
  const ts = require('typescript');
  const updates = [];
  let focused = false;
  let focusOptions;
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
    document: { documentElement: { dataset: {}, style: { setProperty() {} } } },
    localStorage: { setItem() {} },
    window: { dispatchEvent() {} },
    Event,
    require: (name) =>
      name === 'react'
        ? {
            useId: () => 'appearance-test',
            useRef: () => ({
              current: {
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
        : name === 'framer-motion'
          ? {
              motion: { div: 'div' },
              AnimatePresence: 'presence',
              useReducedMotion: () => false,
            }
          : name === '../utils/appearance-motion'
            ? { animateAppearanceChange: (_event, update) => update() }
            : createRequire(path.resolve('components/AppearanceMenu.tsx'))(name),
  });
  const menu = module.exports.default();
  const inside = {};
  const currentTarget = { contains: (target) => target === inside };
  // Chrome emits relatedTarget=null when pressing a non-focusable label span.
  menu.props.onBlur({ currentTarget, relatedTarget: null });
  assert.deepEqual(updates, []);
  menu.props.onBlur({ currentTarget, relatedTarget: inside });
  assert.deepEqual(updates, []);
  menu.props.onBlur({ currentTarget, relatedTarget: {} });
  assert.deepEqual(
    updates,
    [false],
    'Tab to an outside control still dismisses',
  );
  updates.length = 0;
  const panel = menu.props.children[1].props.children.props.children;
  const fieldset = panel.props.children[1];
  const violet = fieldset.props.children[1][2];
  violet.props.children[0].props.onChange({
    currentTarget: {},
    nativeEvent: {},
  });
  assert.deepEqual(updates, [false], 'selection closes the menu');
  assert.equal(focused, true, 'selection returns focus to the trigger');
  assert.equal(focusOptions?.preventScroll, true);
});
