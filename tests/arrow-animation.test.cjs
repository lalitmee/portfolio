const assert = require('node:assert/strict');
const test = require('node:test');
const { animateArrows } = require('../utils/arrowAnimation.ts');

test('starts finite stretch animations for both arrow types', () => {
  const animations = [];
  const element = {
    querySelectorAll: () => [{ animate: (...args) => animations.push(args) }],
  };
  global.window = { matchMedia: () => ({ matches: false }) };

  animateArrows(element);

  assert.equal(animations.length, 4);
  assert.ok(
    animations.every(
      ([, options]) =>
        options.duration === 320 && options.easing === 'ease-in-out',
    ),
  );
});

test('reduced motion never starts an arrow animation', () => {
  global.window = { matchMedia: () => ({ matches: true }) };
  animateArrows({
    querySelectorAll: () => {
      throw new Error('must not animate');
    },
  });
});
