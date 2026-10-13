const assert = require('node:assert/strict');
const test = require('node:test');
const portfolio = require('../data/portfolio.json');
const { generateSlug } = require('../utils/slug.ts');
const { caseStudies } = require('../data/caseStudies.ts');

const baselineProjectSlugs = [
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

test('portfolio states 8+ years of experience', () => {
  assert.equal(portfolio.personal.yearsOfExperience, '8+');
});

test('case studies have the required unique slugs', () => {
  const slugs = caseStudies.map(({ slug }) => slug);
  assert.deepEqual(slugs, [
    'nykaa-cart-reliability',
    'nykaa-measurement-attribution',
    'quartic-data-interfaces',
  ]);
  assert.equal(new Set(slugs).size, slugs.length);
});

test('curated projects retain all legacy project URLs', () => {
  const currentSlugs = new Set(
    portfolio.projects.map(({ title }) => generateSlug(title)),
  );
  assert.deepEqual(
    baselineProjectSlugs.filter((slug) => !currentSlugs.has(slug)),
    [],
  );
});

test('curated projects include the five selected tools', () => {
  const slugs = new Set(portfolio.projects.map(({ title }) => generateSlug(title)));
  for (const slug of [
    'browse-nvim',
    'cobalt2-nvim',
    'codecompanion-spinners-nvim',
    'markdown-previewer',
    'dotfiles',
  ]) {
    assert.ok(slugs.has(slug), `missing project slug: ${slug}`);
  }
});

test('portfolio evidence omits unsupported impact claims', () => {
  const content = JSON.stringify({ portfolio, caseStudies });
  assert.doesNotMatch(content, /10x daily orders|3x daily orders|60% faster|1M\+ users|99\.9% uptime/i);
});
