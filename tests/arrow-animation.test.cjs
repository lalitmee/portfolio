const assert = require('node:assert/strict');
const test = require('node:test');
const { animateArrows } = require('../utils/arrowAnimation.ts');

test('starts three diminishing stretch bounces for both arrow types', () => {
  const animations = [];
  const element = {
    querySelectorAll: (selector) => [
      { animate: (...args) => animations.push([selector, ...args]) },
    ],
  };
  global.window = { matchMedia: () => ({ matches: false }) };

  animateArrows(element);

  assert.equal(animations.length, 4);
  assert.ok(
    animations.every(
      ([selector, keyframes, options]) =>
        keyframes.length === 8 &&
        Number(keyframes[1].transform.match(/scaleX\(([\d.]+)\)/)[1]) >
          Number(keyframes[3].transform.match(/scaleX\(([\d.]+)\)/)[1]) &&
        Number(keyframes[3].transform.match(/scaleX\(([\d.]+)\)/)[1]) >
          Number(keyframes[5].transform.match(/scaleX\(([\d.]+)\)/)[1]) &&
        (selector.includes('arrow-head')
          ? Number(keyframes[1].transform.match(/translateX\(([\d.]+)%\)/)[1]) >= 50
          : Number(keyframes[1].transform.match(/scaleX\(([\d.]+)\)/)[1]) >= 1.8) &&
        keyframes[0].transform === keyframes[2].transform &&
        keyframes[2].transform === keyframes[4].transform &&
        keyframes[4].transform === keyframes[6].transform &&
        keyframes[6].transform === keyframes[7].transform &&
        options.duration === 720 &&
        options.easing === 'ease-in-out',
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
