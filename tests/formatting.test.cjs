const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { test } = require('node:test');

const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));

test('workspace uses Prettier automatically on save', () => {
  const settings = readJson('.vscode/settings.json');

  assert.equal(settings['editor.formatOnSave'], true);
  assert.equal(settings['editor.defaultFormatter'], 'esbenp.prettier-vscode');
});

test('workspace recommends Prettier and exposes format scripts', () => {
  const extensions = readJson('.vscode/extensions.json');
  const { scripts } = readJson('package.json');

  assert.ok(extensions.recommendations.includes('esbenp.prettier-vscode'));
  assert.equal(scripts.format, 'prettier --write .');
  assert.equal(scripts['format:check'], 'prettier --check .');
});

test('formatting skips generated workspaces and build output', () => {
  const ignored = readFileSync('.prettierignore', 'utf8');

  assert.match(ignored, /^\.superpowers\/$/m);
  assert.match(ignored, /^\.next\/$/m);
  assert.doesNotMatch(ignored, /^package\.json$/m);
});
