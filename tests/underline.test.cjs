const assert = require('node:assert/strict');
const test = require('node:test');
const { setUnderlineOrigin } = require('../utils/textLinkReveal.ts');

test('underline follows entry and exit sides without restarting between children', () => {
  assert.equal(typeof setUnderlineOrigin, 'function');
  const properties = new Map();
  const child = { nodeType: 1 };
  const link = {
    contains: (node) => node === child,
    getBoundingClientRect: () => ({ left: 100, width: 80 }),
    style: { setProperty: (name, value) => properties.set(name, value) },
  };
  const target = { closest: () => link };
  for (const [type, clientX, side] of [
    ['pointerover', 101, 'left'],
    ['pointerout', 181, 'right'],
    ['pointerover', 179, 'right'],
    ['pointerout', 99, 'left'],
    ['pointerover', 120, 'left'],
    ['pointerover', 160, 'right'],
  ]) {
    setUnderlineOrigin({ target, type, clientX, relatedTarget: null, pointerType: 'mouse' });
    assert.equal(properties.get('--underline-origin'), side);
  }
  setUnderlineOrigin({ target, clientX: 101, relatedTarget: child, pointerType: 'mouse' });
  assert.equal(properties.get('--underline-origin'), 'right');
  setUnderlineOrigin({ target, clientX: 101, relatedTarget: null, pointerType: 'touch' });
  assert.equal(properties.get('--underline-origin'), 'right');
  assert.doesNotThrow(() => setUnderlineOrigin({ target: { closest: () => null } }));
});
