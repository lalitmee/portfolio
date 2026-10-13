const assert = require('node:assert/strict');
const test = require('node:test');
const portfolio = require('../data/portfolio.json');
const { filterProjects } = require('../utils/projectSearch.ts');

test('blank and whitespace queries preserve the catalog order', () => {
  assert.deepEqual(filterProjects(portfolio.projects, ''), portfolio.projects);
  assert.deepEqual(
    filterProjects(portfolio.projects, '  '),
    portfolio.projects,
  );
});

test('trimmed case-insensitive queries match titles, descriptions, and technologies', () => {
  assert.deepEqual(
    filterProjects(portfolio.projects, '  BROWSE.NVIM  ').map(
      ({ title }) => title,
    ),
    ['browse.nvim'],
  );
  assert.deepEqual(
    filterProjects(portfolio.projects, 'CHOICE OF METHOD').map(
      ({ title }) => title,
    ),
    ['browse.nvim'],
  );
  assert.deepEqual(
    filterProjects(portfolio.projects, 'CODECOMPANION').map(
      ({ title }) => title,
    ),
    ['codecompanion-spinners.nvim'],
  );
});

test('unmatched query returns no projects', () => {
  assert.deepEqual(
    filterProjects(portfolio.projects, 'no matching project'),
    [],
  );
});
