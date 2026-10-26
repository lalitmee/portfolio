const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

test('Magnetic component wraps children with spring-based motion and reduced-motion guard', () => {
  const file = fs.readFileSync(
    path.join(__dirname, '../components/Magnetic.tsx'),
    'utf8',
  );
  assert.match(file, /useReducedMotion/);
  assert.match(file, /useSpring/);
  assert.match(file, /motion\.(div|span)/);
  assert.match(file, /onPointerMove/);
  assert.match(file, /onPointerLeave/);
});

test('Home page hero portrait is wrapped in Magnetic', () => {
  const file = fs.readFileSync(
    path.join(__dirname, '../pages/index.tsx'),
    'utf8',
  );
  assert.match(file, /import Magnetic from '\.\.\/components\/Magnetic'/);
  assert.match(file, /<Magnetic[^>]*>\s*<div className="hero-portrait"/);
});
