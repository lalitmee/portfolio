const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createRequire } = require('node:module');
const test = require('node:test');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { FaGithub, FaLinkedin } = require('react-icons/fa');

const filename = path.resolve('components/icons/AnimatedIcons.tsx');
const names = [
  'Bulb',
  'Sliders',
  'Widgets',
  'Construction',
  'Briefcase',
  'Education',
  'Document',
  'Code',
  'Info',
  'Outcome',
  'ExternalLink',
  'Email',
  'Location',
  'Send',
  'Menu',
  'Close',
  'Sun',
  'Moon',
  'Palette',
  'Check',
  'Github',
  'Linkedin',
  'UpArrow',
];
test('moon keeps an unfilled outline and no plus ornament during its phase cycle', () => {
  const { MoonIcon } = loadIcons();
  const html = renderToStaticMarkup(
    React.createElement(
      'div',
      null,
      React.createElement(MoonIcon),
      React.createElement(MoonIcon),
    ),
  );
  assert.doesNotMatch(html, /moon-star|<mask|fill="currentColor"/);
  assert.ok(
    html.includes(
      'd="M14 3C8 1 3 5 3 11C3 17 8 22 14 21C17 20 20 18 21 15C12 18 7 9 14 3Z"',
    ),
    'resting moon has a broad crescent, not a narrow bracket',
  );
  assert.equal(
    (html.match(/class="icon-detail moon-phase" fill="none"/g) || []).length,
    2,
  );
  const css = fs.readFileSync('styles/globals.css', 'utf8');
  assert.match(css, /@keyframes icon-moon-phase[\s\S]+?50%\s*\{\s*d:\s*path\(/);
});
function loadIcons() {
  assert.ok(fs.existsSync(filename), 'shared animated icon module exists');
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    require: createRequire(filename),
  });
  return module.exports;
}

test('every icon has visible geometry and decorative non-focusable semantics', () => {
  const icons = loadIcons();
  for (const name of names) {
    const html = renderToStaticMarkup(
      React.createElement(icons[`${name}Icon`], {
        className: 'caller-size',
        width: 32,
        'aria-hidden': false,
        focusable: true,
      }),
    );
    assert.match(html, /^<svg/);
    assert.match(html, /class="animated-icon [^"]*caller-size/);
    assert.match(html, /aria-hidden="true"/);
    assert.match(html, /focusable="false"/);
    assert.match(html, /width="32"/);
    assert.match(html, /(?:stroke|fill)="currentColor"/);
    assert.match(html, /class="icon-detail/);
    assert.match(html, /<(?:path|circle|rect|g)\b/);
    assert.doesNotMatch(html, /<animate|opacity="0"|display="none"/);
  }
});

test('repeated brand instances retain installed logo geometry and local clips', () => {
  const icons = loadIcons();
  for (const [name, Original] of [
    ['Github', FaGithub],
    ['Linkedin', FaLinkedin],
  ]) {
    const Icon = icons[`${name}Icon`];
    const html = renderToStaticMarkup(
      React.createElement(
        'div',
        null,
        React.createElement(Icon),
        React.createElement(Icon),
      ),
    );
    const ids = [...html.matchAll(/id="([^"]+)"/g)].map((match) => match[1]);
    const refs = [...html.matchAll(/clip-path="url\(#([^\)]+)\)"/g)].map(
      (match) => match[1],
    );
    assert.equal(ids.length, 2);
    assert.equal(new Set(ids).size, 2);
    assert.deepEqual(refs, ids);
    const original = renderToStaticMarkup(React.createElement(Original));
    for (const [, d] of original.matchAll(/ d="([^"]+)"/g)) {
      assert.equal(
        html.split(`d="${d}"`).length - 1,
        4,
        'base and clip preserve original path for both copies',
      );
    }
  }
});

test('brand highlight stroke rests entirely outside the logo at both endpoints', () => {
  const { LinkedinIcon } = loadIcons();
  const html = renderToStaticMarkup(React.createElement(LinkedinIcon));
  const highlight = html.match(
    /<path class="icon-detail brand-highlight"[^>]+/,
  )[0];
  const d = highlight.match(/ d="([^"]+)"/)[1];
  let x = 0;
  const xs = [];
  for (const [, command, values] of d.matchAll(/([MLHh])([^MLHhZ]+)/g)) {
    const value = Number(values.trim().split(/[ ,]+/)[0]);
    x = command === 'h' ? x + value : value;
    xs.push(x);
  }
  const radius = Number(highlight.match(/stroke-width="([^"]+)"/)[1]) / 2;
  assert.ok(
    Math.max(...xs) + radius <= 0,
    'resting highlight cannot cover logo',
  );
  const css = fs.readFileSync('styles/globals.css', 'utf8');
  const end = Number(
    css.match(
      /@keyframes icon-highlight[\s\S]+?to\s*\{\s*transform:\s*translateX\((\d+)px\)/,
    )[1],
  );
  assert.ok(
    Math.min(...xs) + end - radius >= 24,
    'finished highlight clears logo',
  );
});
