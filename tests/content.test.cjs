const assert = require('node:assert/strict');
const { test } = require('node:test');
const portfolio = require('../data/portfolio.json');
const { generateSlug } = require('../utils/slug.ts');
const { caseStudies } = require('../data/caseStudies.ts');

const legacySlugs = [
  'browse-nvim',
  'cobalt2-nvim',
  'github-search',
  'dotfiles',
  'portfolio',
  'ud-myreads',
  'ud-neighborhood-map',
  'ud-restaurant-rewiews-stage1',
  'ud-feedreader-testing',
  'ud-classic-arcade-game',
  'ud-memory-game',
  'ud-pixel-art-maker',
  'ud-portfolio',
];

test('portfolio content preserves truthful, stable evidence', () => {
  assert.equal(portfolio.personal.yearsOfExperience, '8+');
  assert.equal(portfolio.stats.experience.value, '8+');
  assert.deepEqual(caseStudies.map(({ slug }) => slug), [
    'nykaa-cart-reliability',
    'nykaa-measurement-attribution',
    'quartic-data-interfaces',
  ]);
  assert.equal(new Set(caseStudies.map(({ slug }) => slug)).size, caseStudies.length);

  const projectSlugs = portfolio.projects.map(({ title }) => generateSlug(title));
  for (const slug of legacySlugs) assert.ok(projectSlugs.includes(slug), `missing ${slug}`);
  for (const title of [
    'browse.nvim',
    'cobalt2.nvim',
    'codecompanion-spinners.nvim',
    'markdown-previewer',
    'dotfiles',
  ]) {
    assert.ok(portfolio.projects.some((project) => project.title === title), `missing ${title}`);
  }

  const content = JSON.stringify({ portfolio, caseStudies });
  assert.doesNotMatch(content, /10x|60%|1M\+|99\.9%|3x/i);
});
