const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.join(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file));

test('document and manifest reference the static LK icon family', () => {
  const document = read('pages/_document.tsx').toString();
  const manifest = JSON.parse(read('public/manifest.json'));

  assert.match(document, /href="\/favicon\.svg"/);
  assert.match(document, /href="\/manifest\.json"/);
  assert.equal(manifest.theme_color, '#111820');
  assert.ok(manifest.icons.some((icon) => icon.src === '/icon.png'));
});

test('inline brand and favicon use the same SVG path geometry', () => {
  const brand = read('components/BrandMark.tsx').toString();
  const favicon = read('public/favicon.svg').toString();
  const geometry = (source) => [...source.matchAll(/<path\b[^>]*\bd="([^"]+)"/g)].map((match) => match[1]);

  assert.deepEqual(geometry(brand), geometry(favicon));
  assert.ok(geometry(favicon).length > 0);
});

test('favicon raster files use PNG and ICO signatures', () => {
  assert.deepEqual([...read('public/favicon.png').subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  assert.deepEqual([...read('public/icon.png').subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  assert.deepEqual([...read('public/favicon.ico').subarray(0, 4)], [0, 0, 1, 0]);
});
