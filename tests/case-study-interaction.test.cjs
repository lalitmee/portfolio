const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const page = fs.readFileSync(
  path.join(__dirname, '../pages/work/[slug].tsx'),
  'utf8',
);
const styles = fs.readFileSync(
  path.join(__dirname, '../styles/globals.css'),
  'utf8',
);

test('Nykaa case page has the three named native disclosures', () => {
  assert.match(page, /study\.slug\s*===\s*['"]nykaa-cart-reliability['"]/);
  assert.equal((page.match(/<details\b/g) || []).length, 3);
  assert.equal((page.match(/<summary\b/g) || []).length, 3);

  for (const [number, label] of [
    ['01', 'The challenge'],
    ['02', 'What I did and why'],
    ['03', 'The outcome'],
  ]) {
    assert.ok(page.includes(number));
    assert.ok(page.includes(label));
  }
});

test('Nykaa decision path uses existing fields without invented metrics', () => {
  assert.match(page, /study\.context/);
  assert.match(page, /study\.contribution\.map/);
  assert.match(page, /study\.decisions\.map/);
  assert.match(page, /study\.outcome/);
  assert.match(styles, /\.case-detail\s*>\s*details\s*\{/);
  assert.match(styles, /summary:focus-visible/);
});

test('other cases retain the four-section presentation', () => {
  for (const heading of ['Context', 'Contribution', 'Decisions', 'Outcome']) {
    assert.ok(page.includes(heading), `missing existing heading: ${heading}`);
  }
  assert.match(page, /study\.context/);
  assert.match(page, /study\.contribution\.map/);
  assert.match(page, /study\.decisions\.map/);
  assert.match(page, /study\.outcome/);
});
