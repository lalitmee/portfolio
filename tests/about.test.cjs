const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const page = fs.readFileSync(
  path.join(__dirname, '../pages/about.tsx'),
  'utf8',
);
const styles = fs.readFileSync(
  path.join(__dirname, '../styles/globals.css'),
  'utf8',
);

test('resume section uses plain title, concise note, and inline actions', () => {
  assert.match(page, /<h2>Resume<\/h2>/);
  assert.doesNotMatch(page, /Résumé/);
  assert.match(page, /The PDF is an older version and may be out of date\./);
  assert.match(page, /className="resume-actions"/);
  assert.match(page, /Download PDF/);
  assert.match(page, /Get in touch/);
  assert.match(page, /href=\{portfolioData\.personal\.resume\}/);
  assert.match(page, /resume_download/);
  assert.match(page, /download/);
  assert.match(styles, /\.resume-actions\s*\{[^}]*display:\s*flex/s);
});

test('about page pairs its portrait with an accessible career timeline and education card', () => {
  assert.match(page, /<section className="about-intro"/);
  assert.match(page, /src="\/images\/profile_v3\.png"/);
  assert.match(page, /alt="Lalit Kumar"/);
  assert.match(page, /className="career-timeline"/);
  assert.match(page, /<time>/);
  assert.match(page, /Education &amp; community/);
  assert.match(page, /src=\{item\.image\}/);
  assert.match(page, /alt=\{`\$\{item\.institution\} logo`\}/);
  assert.match(styles, /\.about-intro\s*\{[^}]*grid-template-columns/s);
  assert.match(styles, /\.career-timeline::before/);
  assert.match(styles, /\.education-card\s*\{/);
  assert.match(styles, /\.about-intro[\s\S]*?@media \(max-width: 760px\)/);
});

test('about interactions distinguish the current role and expose clear animated links', () => {
  assert.match(page, /className=\{job\.current \? 'is-current' : undefined\}/);
  assert.match(page, /<span className="career-current">Current<\/span>/);
  assert.match(styles, /\.career-timeline::before\s*\{[^}]*left:\s*0\.35rem/s);
  assert.match(styles, /\.career-current\s*\{/);
  assert.match(styles, /\.education-card img\s*\{[^}]*background:\s*#fff/s);
  assert.match(page, /Download PDF <DirectionalArrow direction="forward" \/>/);
  assert.match(
    page,
    /className="text-link" href="https:\/\/github\.com\/lalitmee"/,
  );
  assert.match(page, /Explore my work on GitHub/);
  assert.equal(
    (page.match(/<DirectionalArrow direction="forward" \/>/g) || []).length,
    3,
  );
});
