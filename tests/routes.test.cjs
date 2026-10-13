const assert = require('node:assert/strict');
const test = require('node:test');
const portfolio = require('../data/portfolio.json');
const { generateSlug } = require('../utils/slug.ts');
const work = require('../pages/work/[slug].tsx');
const projects = require('../pages/projects/[slug].tsx');

test('work routes statically include all cases and return notFound for unknown slugs', async () => {
  const { paths, fallback } = await work.getStaticPaths();
  assert.deepEqual(paths, [
    { params: { slug: 'nykaa-cart-reliability' } },
    { params: { slug: 'nykaa-measurement-attribution' } },
    { params: { slug: 'quartic-data-interfaces' } },
  ]);
  assert.equal(fallback, false);
  assert.deepEqual(
    await work.getStaticProps({ params: { slug: 'missing-case' } }),
    {
      notFound: true,
    },
  );
});

test('project static paths preserve every project slug', async () => {
  const { paths, fallback } = await projects.getStaticPaths();
  assert.equal(fallback, false);
  assert.deepEqual(
    paths.map(({ params }) => params.slug),
    portfolio.projects.map(({ title }) => generateSlug(title)),
  );
});
