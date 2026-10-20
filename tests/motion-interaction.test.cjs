const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const postcss = require('postcss');
const test = require('node:test');

const css = fs.readFileSync(
  path.join(__dirname, '../styles/globals.css'),
  'utf8',
);
const themeToggle = fs.readFileSync(
  path.join(__dirname, '../components/ThemeToggle.tsx'),
  'utf8',
);
const navigation = fs.readFileSync(
  path.join(__dirname, '../components/Navigation.tsx'),
  'utf8',
);
const root = postcss.parse(css);

function findRule(selector) {
  const expectedSelector = selector.replace(/\s+/g, ' ');
  return root.nodes.find(
    (node) =>
      node.type === 'rule' && node.selector.replace(/\s+/g, ' ') === expectedSelector,
  );
}

function declarations(rule) {
  assert.ok(rule, 'expected CSS rule exists');
  return Object.fromEntries(
    rule.nodes
      .filter((node) => node.type === 'decl')
      .map(({ prop, value }) => [prop, value]),
  );
}

test('directional arrows respond to hover and keyboard focus', () => {
  const linkArrow = findRule(
    '.text-link:hover svg,\n.text-link:focus-visible svg',
  );
  const rowArrow = findRule(
    '.case-row:hover .row-arrow,\n.case-row:focus-visible .row-arrow,\n.project-link:hover .row-arrow,\n.project-link:focus-visible .row-arrow',
  );

  assert.ok(linkArrow, 'text-link arrow has pointer and keyboard states');
  assert.match(declarations(linkArrow).transform, /translate/);
  assert.ok(rowArrow, 'row arrows have pointer and keyboard states');
  assert.match(declarations(rowArrow).transform, /translate/);
  assert.match(declarations(findRule('.row-arrow')).transition, /transform/);
});

test('buttons have hover and pressed feedback without layout changes', () => {
  const hover = findRule('.button:hover,\n.button:focus-visible');
  const pressed = findRule('.button:active');

  assert.match(declarations(hover).transform, /translateY/);
  assert.match(declarations(pressed).transform, /scale|translateY/);
});

test('state-changing control icons animate their persistent wrapper', () => {
  const theme = findRule(
    ".theme-toggle[aria-pressed='true'] .theme-toggle-icon",
  );
  const menu = findRule(
    ".menu-toggle[aria-expanded='true'] .menu-toggle-icon",
  );
  const icons = findRule('.theme-toggle-icon,\n.menu-toggle-icon');

  assert.match(themeToggle, /className="theme-toggle-icon"/);
  assert.match(navigation, /className="menu-toggle-icon"/);
  assert.match(declarations(theme).transform, /rotate/);
  assert.match(declarations(menu).transform, /rotate/);
  assert.match(declarations(icons).transition, /transform/);
});

test('reduced motion removes movement but keeps interaction states', () => {
  const reducedMotion = root.nodes.find(
    (node) => node.type === 'atrule' && /prefers-reduced-motion:\s*reduce/.test(node.params),
  );
  const rules = reducedMotion.nodes.filter((node) => node.type === 'rule');
  const reducedSelectors = rules
    .map((rule) => rule.selector.replace(/\s+/g, ' '))
    .join('\n');

  assert.match(reducedSelectors, /\.text-link:hover svg/);
  assert.match(reducedSelectors, /\.row-arrow/);
  assert.match(reducedSelectors, /\.button:hover/);
  assert.match(reducedSelectors, /\.button:active/);
  assert.match(reducedSelectors, /\.theme-toggle-icon/);
  assert.match(reducedSelectors, /\.menu-toggle-icon/);
  assert.ok(rules.some((rule) => declarations(rule).transform === 'none'));
  assert.ok(rules.some((rule) => declarations(rule).filter === 'none'));
  assert.ok(rules.some((rule) => declarations(rule)['box-shadow']));
});

test('touch interaction does not rely on hover', () => {
  const pressed = findRule('.button:active');
  const focused = findRule('.text-link:hover,\n.text-link:focus-visible');

  assert.ok(declarations(pressed).transform);
  assert.ok(focused, 'text link retains a focus-visible affordance');
  assert.ok(declarations(focused)['text-decoration-color']);
});
