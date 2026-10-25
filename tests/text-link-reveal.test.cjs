const assert = require('node:assert/strict');
const test = require('node:test');
const { setTextLinkRevealOrigin } = require('../utils/textLinkReveal.ts');

test('action iris starts at entry coordinates and does not restart over its children', () => {
  const properties = new Map();
  const child = {};
  const link = {
    contains: (node) => node === child,
    getBoundingClientRect: () => ({ left: 100, top: 50 }),
    style: { setProperty: (name, value) => properties.set(name, value) },
  };
  const target = { closest: (selector) => {
    assert.equal(selector, 'a.text-link');
    return link;
  } };
  setTextLinkRevealOrigin({ target, relatedTarget: null, clientX: 102, clientY: 70 });
  assert.equal(properties.get('--reveal-x'), '2px');
  assert.equal(properties.get('--reveal-y'), '20px');
  setTextLinkRevealOrigin({ target, relatedTarget: child, clientX: 140, clientY: 80 });
  assert.equal(properties.get('--reveal-x'), '2px');
  assert.equal(properties.get('--reveal-y'), '20px');
  assert.doesNotThrow(() => setTextLinkRevealOrigin({ target: { closest: () => null } }));
});
