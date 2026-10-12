const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const portfolio = require('../data/portfolio.json');
const { generateSlug } = require('../utils/slug.ts');

const originalProjectSlugs = [
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

test('project slugs remain unique and preserve every existing URL', () => {
  const projectSlugs = portfolio.projects.map((project) =>
    generateSlug(project.title),
  );

  assert.equal(new Set(projectSlugs).size, projectSlugs.length);
  for (const slug of originalProjectSlugs) {
    assert.ok(projectSlugs.includes(slug), `missing existing slug: ${slug}`);
  }
});

test('case studies use the approved slugs', () => {
  const caseFile = path.join(__dirname, '../data/caseStudies.ts');
  assert.ok(fs.existsSync(caseFile), 'case study content module exists');
  const { caseStudies } = require(caseFile);

  assert.deepEqual(
    caseStudies.map((study) => study.slug),
    [
      'nykaa-cart-reliability',
      'nykaa-measurement-attribution',
      'quartic-data-interfaces',
    ],
  );
});

test('public portfolio content has accurate experience and project curation', () => {
  assert.equal(portfolio.personal.yearsOfExperience, '8+');

  const titles = portfolio.projects.map((project) => project.title);
  for (const title of [
    'browse.nvim',
    'cobalt2.nvim',
    'codecompanion-spinners.nvim',
    'markdown-previewer',
    'dotfiles',
  ]) {
    assert.ok(titles.includes(title), `missing curated project: ${title}`);
  }

  const content = JSON.stringify(portfolio).toLowerCase();
  for (const unsupportedClaim of [
    '10x daily orders',
    '3x daily orders',
    '60% faster',
    '1m+ users',
    '99.9% uptime',
  ]) {
    assert.ok(!content.includes(unsupportedClaim), `remove ${unsupportedClaim}`);
  }
});

test('public portfolio data does not publish placeholder testimonials or unsupported stats', () => {
  assert.deepEqual(portfolio.testimonials, []);
  assert.deepEqual(portfolio.professionalImpact, []);
  assert.equal(portfolio.stats.experience.value, '8+');
  assert.ok(!JSON.stringify(portfolio.stats).match(/\b(?:20\+|15\+|6\+)\b/));
});
