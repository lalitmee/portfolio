const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

test('project archive has an accessible button, title, count and decorative toggle', () => {
  const page = fs.readFileSync('pages/projects/index.tsx', 'utf8');
  assert.match(page, /className="archive-trigger"/);
  assert.match(page, /aria-expanded=\{archiveOpen\}/);
  assert.match(page, /aria-controls="project-archive-content"/);
  assert.match(page, /id="project-archive-content"/);
  assert.match(page, /inert=\{!archiveOpen\}/);
  assert.match(
    page,
    /className="archive-count">\s*\{archiveProjects.length\} projects/,
  );
  assert.match(page, /className="archive-toggle" aria-hidden="true"/);
  assert.match(page, /className="archive-content"[\s\S]*archiveProjects.map/);
});

test('archive border extends beyond aligned text and has only the grid divider', () => {
  const css = fs.readFileSync('styles/globals.css', 'utf8');
  const archive = css.match(/\.project-archive\s*\{([^}]+)\}/)[1];
  const summary = css.match(/\.archive-trigger\s*\{([^}]+)\}/)[1];
  const content = css.match(/\.archive-content\s*\{([^}]+)\}/)[1];
  assert.match(
    archive,
    /margin-inline: calc\(-1 \* var\(--archive-inset\) - 1px\)/,
  );
  assert.match(summary, /padding: [^;]*var\(--archive-inset\)/);
  assert.match(content, /margin-inline: var\(--archive-inset\)/);
  assert.doesNotMatch(content, /border-top:/);
});

test('archive panel uses theme tokens, custom disclosure and restrained reveal motion', () => {
  const css = fs.readFileSync('styles/globals.css', 'utf8');
  assert.match(css, /\.project-archive\s*\{[^}]*background: var\(--panel\)/);
  assert.match(css, /\.archive-trigger\s*\{[^}]*text-align: left/);
  assert.match(
    css,
    /\.project-archive\[data-open='true'\] \.archive-toggle::after\s*\{[^}]*transform: rotate\(0deg\)/,
  );
  const page = fs.readFileSync('pages/projects/index.tsx', 'utf8');
  assert.match(page, /height: archiveOpen \? 'auto' : 0/);
  assert.match(page, /duration: shouldReduceMotion \? 0 : 0\.28/);
  assert.match(page, /initial=\{false\}/);
  assert.doesNotMatch(css, /archive-reveal/);
  assert.match(
    css,
    /prefers-reduced-motion: reduce[\s\S]*animation-duration: 0\.01ms !important/,
  );
});
