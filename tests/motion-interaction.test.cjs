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
      node.type === 'rule' &&
      node.selector.replace(/\s+/g, ' ') === expectedSelector,
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
    '.text-link:hover .directional-arrow-forward .arrow-current,\n.text-link:focus-visible .directional-arrow-forward .arrow-current',
  );
  const rowArrow = findRule(
    '.case-row:hover .row-arrow,\n.case-row:focus-visible .row-arrow,\n.project-link:hover .row-arrow,\n.project-link:focus-visible .row-arrow',
  );

  assert.ok(linkArrow, 'text-link arrow has pointer and keyboard states');
  assert.match(declarations(linkArrow).animation, /arrow-relay-forward/);
  assert.ok(rowArrow, 'row arrows have pointer and keyboard states');
  assert.match(declarations(rowArrow).animation, /arrow-bounce-tilt/);
  assert.match(declarations(findRule('.row-arrow')).transition, /transform/);
});

test('text links align labels and icons with one consistent gap', () => {
  const link = declarations(findRule('.text-link'));
  const icon = declarations(findRule('.text-link svg'));
  const appBrowse = declarations(findRule('.app-feature-browse'));

  assert.equal(link.display, 'inline-flex');
  assert.equal(link['align-items'], 'center');
  assert.equal(link.gap, '0.5em');
  assert.equal(link['white-space'], 'nowrap');
  assert.equal(icon['margin-inline-start'], undefined);
  assert.doesNotMatch(
    css,
    /\.directional-arrow-(?:forward|back)\s*\{[^}]*margin-/s,
  );
  assert.equal(appBrowse.gap, undefined);
});

test('selected work arrows are vertically centered in their rows', () => {
  const caseArrow = declarations(findRule('.case-row .row-arrow'));
  const projectArrow = declarations(findRule('.project-link .row-arrow'));

  assert.equal(caseArrow['align-self'], 'center');
  assert.equal(projectArrow['align-self'], 'center');
});

test('horizontal arrows relay in opposite directions without shadows', () => {
  const forward = declarations(
    findRule(
      '.text-link:hover .directional-arrow-forward .arrow-current,\n.text-link:focus-visible .directional-arrow-forward .arrow-current',
    ),
  );
  const back = declarations(
    findRule(
      '.text-link:hover .directional-arrow-back .arrow-current,\n.text-link:focus-visible .directional-arrow-back .arrow-current',
    ),
  );
  const track = declarations(findRule('.directional-arrow'));

  assert.equal(track.overflow, 'hidden');
  assert.match(forward.animation, /arrow-relay-forward/);
  assert.match(back.animation, /arrow-relay-back/);
  assert.doesNotMatch(css, /drop-shadow\([^)]*currentColor/);
});

test('diagonal row arrows bounce and tilt only during interaction', () => {
  const interaction = findRule(
    '.case-row:hover .row-arrow,\n.case-row:focus-visible .row-arrow,\n.project-link:hover .row-arrow,\n.project-link:focus-visible .row-arrow',
  );

  assert.match(declarations(interaction).animation, /arrow-bounce-tilt/);
});

test('buttons have hover and pressed feedback without layout changes', () => {
  const hover = findRule('.button:hover,\n.button:focus-visible');
  const iconHover = findRule(
    '.button:hover svg:not(.send-plane),\n.button:focus-visible svg:not(.send-plane)',
  );
  const pressed = findRule('.button:active');

  assert.match(declarations(hover).transform, /translateY/);
  assert.match(declarations(iconHover).animation, /arrow-bounce-tilt/);
  assert.match(declarations(pressed).transform, /scale|translateY/);
});

test('send icon loops inside the button and returns to its starting position', () => {
  const sendIcon = findRule('.button .send-icon');
  const sendHover = findRule(
    '.button:hover .send-icon,\n.button:focus-visible .send-icon',
  );

  assert.equal(declarations(sendIcon)['offset-rotate'], 'auto 45deg');
  assert.match(declarations(sendIcon)['offset-path'], /shape\(/);
  assert.equal(
    (declarations(sendIcon)['offset-path'].match(/curve to/g) ?? []).length,
    4,
  );
  assert.equal(
    declarations(sendHover).animation,
    'send-icon-flight 2200ms linear',
  );
  assert.equal(declarations(findRule('.send-button')).overflow, 'hidden');
  const flight = root.nodes.find(
    (node) => node.type === 'atrule' && node.params === 'send-icon-flight',
  );
  const frames = flight.nodes.map((node) => declarations(node));
  assert.deepEqual(frames, [
    { 'offset-distance': '0%', 'offset-rotate': 'auto 45deg' },
    { 'offset-rotate': 'auto 0deg' },
    { 'offset-distance': '100%', 'offset-rotate': 'auto 45deg' },
  ]);
  assert.equal(
    declarations(
      findRule(
        '.send-button:hover .send-label,\n.send-button:focus-visible .send-label',
      ),
    ).animation,
    'send-label-hide 2200ms linear',
  );
});

test('app launch arrows use the same em size as story arrows', () => {
  const launch = declarations(findRule('.app-launch-arrow'));
  const story = declarations(findRule('.directional-arrow svg'));
  assert.equal(launch.width, story.width);
  assert.equal(launch.height, story.height);
});

test('send label glides and fades out and back in without an initial jump', () => {
  const label = root.nodes.find(
    (node) => node.type === 'atrule' && node.params === 'send-label-hide',
  );
  const frames = label.nodes.map((node) => {
    const { opacity, transform } = declarations(node);
    return { opacity, transform };
  });
  assert.deepEqual(frames[0], { opacity: '1', transform: 'translateX(0)' });
  assert.deepEqual(frames.at(-1), frames[0]);
  assert.deepEqual(frames[1], {
    opacity: '0',
    transform: 'translateX(-0.75rem)',
  });
});

test('state-changing control icons animate their persistent wrapper', () => {
  const theme = findRule(
    ".theme-toggle[aria-pressed='true'] .theme-toggle-icon",
  );
  const menu = findRule(".menu-toggle[aria-expanded='true'] .menu-toggle-icon");
  const icons = findRule('.theme-toggle-icon,\n.menu-toggle-icon');

  assert.match(themeToggle, /className="theme-toggle-icon"/);
  assert.match(navigation, /className="menu-toggle-icon"/);
  assert.match(declarations(theme).transform, /rotate/);
  assert.match(declarations(menu).transform, /rotate/);
  assert.match(declarations(icons).transition, /transform/);
});

test('reduced motion removes movement but keeps interaction states', () => {
  const reducedMotion = root.nodes.find(
    (node) =>
      node.type === 'atrule' &&
      /prefers-reduced-motion:\s*reduce/.test(node.params),
  );
  const rules = reducedMotion.nodes.filter((node) => node.type === 'rule');
  const reducedSelectors = rules
    .map((rule) => rule.selector.replace(/\s+/g, ' '))
    .join('\n');

  assert.match(reducedSelectors, /\.text-link:hover svg/);
  assert.match(reducedSelectors, /\.directional-arrow/);
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
