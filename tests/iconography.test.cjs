const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const pages = [
  'pages/index.tsx',
  'pages/work/index.tsx',
  'pages/projects/index.tsx',
].map((file) => fs.readFileSync(path.join(__dirname, '..', file), 'utf8'));

test('active case and project rows use Material outward-arrow icons', () => {
  for (const page of pages) {
    assert.doesNotMatch(page, /↗/);
    assert.match(page, /MdArrowOutward/);
    assert.match(page, /aria-hidden="true"/);
  }
});
