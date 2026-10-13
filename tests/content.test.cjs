const assert = require('node:assert/strict');
const { test } = require('node:test');
const portfolio = require('../data/portfolio.json');
const { generateSlug } = require('../utils/slug.ts');
const { caseStudies } = require('../data/caseStudies.ts');
const { markdownExamples } = require('../data/markdownExamples.ts');

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

test('markdown examples are fixed, labelled, and ordered', () => {
  assert.deepEqual(markdownExamples.map(({ id }) => id), ['note', 'checklist', 'table']);
  assert.ok(markdownExamples.every(({ label, source }) => label.trim() && source.trim()));
  assert.deepEqual(markdownExamples.map(({ source }) => source), [
    '# A useful note\n\nSmall details make tools easier to use.',
    '- Read the problem\n- Make the smallest useful change\n- Check the result',
    '| Tool | Purpose |\n| --- | --- |\n| Markdown Previewer | Read local notes |',
  ]);
  assert.ok(markdownExamples.every((example) => !('input' in example) && !('url' in example)));
});
