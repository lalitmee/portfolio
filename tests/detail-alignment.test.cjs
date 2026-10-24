const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

test('detail icons occupy a gutter while prose and headings share a text edge', () => {
  const css = fs.readFileSync('styles/globals.css', 'utf8');
  assert.match(
    css,
    /\.case-detail > section h2 svg\s*\{[^}]*position: absolute/,
  );
  assert.match(css, /\.case-detail > section ul\s*\{[^}]*list-style: disc/);
  assert.doesNotMatch(
    css,
    /\.case-detail > section ul,\s*\.content-page > section ul/,
  );
  assert.match(
    css,
    /@media \(max-width: 760px\)[\s\S]*\.case-detail > section\s*\{[^}]*padding-left: 2rem/,
  );
});
