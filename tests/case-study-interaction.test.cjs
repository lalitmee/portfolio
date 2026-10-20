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

test('Nykaa case page presents its narrative as three always-visible sections', () => {
  assert.doesNotMatch(page, /<details\b|<summary\b/);
  assert.equal((page.match(/className="case-narrative"/g) || []).length, 3);

  for (const label of ['The challenge', 'What I did and why', 'The outcome']) {
    assert.ok(page.includes(label));
  }
});

test('Nykaa decision path uses existing fields without invented metrics', () => {
  assert.match(page, /study\.context/);
  assert.match(page, /study\.contribution\.map/);
  assert.match(page, /study\.decisions\.map/);
  assert.match(page, /study\.outcome/);
  assert.match(styles, /\.case-narrative/);
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
