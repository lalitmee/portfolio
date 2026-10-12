const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
test('professional case lookup returns a case or undefined for an unknown slug', () => {
  const { caseStudies, getCaseStudy } = require('../data/caseStudies.ts');
  assert.equal(getCaseStudy(caseStudies[0].slug), caseStudies[0]);
  assert.equal(getCaseStudy('not-a-case'), undefined);
});

test('all editorial destinations have route modules', () => {
  for (const route of [
    'work/index.tsx',
    'work/[slug].tsx',
    'projects/index.tsx',
    'apps/index.tsx',
    'about.tsx',
    'contact.tsx',
    'privacy.tsx',
    '404.tsx',
  ]) {
    assert.ok(fs.existsSync(path.join(__dirname, '../pages', route)), route);
  }
});

test('career timeline does not publish legacy unverified job summaries', () => {
  const about = fs.readFileSync(path.join(__dirname, '../pages/about.tsx'), 'utf8');
  assert.match(about, /job\.position/);
  assert.match(about, /job\.company/);
  assert.match(about, /job\.startDate/);
  assert.doesNotMatch(about, /job\.description/);
});

test('contact form keeps the existing EmailJS template field names', () => {
  const contact = fs.readFileSync(path.join(__dirname, '../components/Contact.tsx'), 'utf8');
  for (const field of ['name', 'email', 'subject', 'message']) {
    assert.match(contact, new RegExp(`name="${field}"`));
  }
  assert.match(contact, /name="title" value=\{values\.subject\}/);
});

test('contact validation preserves the required fields and message minimum', () => {
  const { validateContactForm } = require('../utils/contactForm.ts');
  assert.deepEqual(
    validateContactForm({ name: '', email: 'bad', subject: '', message: 'short' }),
    {
      name: 'Name is required',
      email: 'Please enter a valid email address',
      subject: 'Subject is required',
      message: 'Message must be at least 10 characters long',
    },
  );
});
