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
    assert.ok(
      !content.includes(unsupportedClaim),
      `remove ${unsupportedClaim}`,
    );
  }
});

test('public portfolio data does not publish placeholder testimonials or unsupported stats', () => {
  assert.deepEqual(portfolio.testimonials, []);
  assert.deepEqual(portfolio.professionalImpact, []);
  assert.equal(portfolio.stats.experience.value, '8+');
  assert.ok(!JSON.stringify(portfolio.stats).match(/\b(?:20\+|15\+|6\+)\b/));
});

test('editorial accents meet contrast and brand name includes its visible label', () => {
  const css = fs.readFileSync(
    path.join(__dirname, '../styles/globals.css'),
    'utf8',
  );
  const navigation = fs.readFileSync(
    path.join(__dirname, '../components/Navigation.tsx'),
    'utf8',
  );
  const contrast = (foreground, background) => {
    const luminance = (color) =>
      color
        .match(/[a-f\d]{2}/gi)
        .map((part) => parseInt(part, 16) / 255)
        .map((channel) =>
          channel <= 0.04045
            ? channel / 12.92
            : ((channel + 0.055) / 1.055) ** 2.4,
        )
        .reduce(
          (sum, channel, index) =>
            sum + channel * [0.2126, 0.7152, 0.0722][index],
          0,
        );
    const values = [luminance(foreground), luminance(background)].sort(
      (a, b) => b - a,
    );
    return (values[0] + 0.05) / (values[1] + 0.05);
  };
  const lightOchre = css.match(/--ochre:\s*(#[\da-f]+)/i)?.[1];
  const lightPaper = css.match(/--paper:\s*(#[\da-f]+)/i)?.[1];
  const darkBlock = css.match(/\.dark\s*\{([^}]+)\}/)?.[1] || '';
  const darkOchre = darkBlock.match(/--ochre:\s*(#[\da-f]+)/i)?.[1];
  const darkPaper = darkBlock.match(/--paper:\s*(#[\da-f]+)/i)?.[1];

  assert.ok(contrast(lightOchre, lightPaper) >= 4.5);
  assert.ok(contrast(darkOchre, darkPaper) >= 4.5);
  const appEyebrowRules = [
    ...css.matchAll(/\.app-feature\s+\.eyebrow\s*\{([^}]+)\}/g),
  ];
  assert.equal(appEyebrowRules.length, 1);
  assert.match(appEyebrowRules[0][1], /color:\s*var\(--paper\)/);
  assert.match(
    navigation,
    /className="site-brand"\s+href="\/"\s+aria-label="LK\., Lalit Kumar home"/,
  );
});
