const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const contact = fs.readFileSync(
  path.join(__dirname, '../components/Contact.tsx'),
  'utf8',
);

test('contact actions keep text labels and have decorative icons', () => {
  for (const [label, icon] of [
    ['Send message', 'MdSend'],
    ['LinkedIn', 'FaLinkedin'],
    ['GitHub', 'FaGithub'],
    ['Based in Bengaluru, India.', 'MdLocationOn'],
  ]) {
    assert.ok(contact.includes(label), `missing visible label: ${label}`);
    assert.ok(contact.includes(icon), `missing icon: ${icon}`);
  }

  assert.equal((contact.match(/aria-hidden="true"/g) || []).length >= 4, true);
  assert.match(contact, /<MdSend className="send-icon" aria-hidden="true" \/>/);
});

test('contact links retain their existing destinations and event channels', () => {
  for (const value of [
    'mailto:${email}',
    'https://linkedin.com/in/lalitmee',
    'https://github.com/lalitmee',
    "channel: 'email'",
    "channel: 'linkedin'",
    "channel: 'github'",
  ]) {
    assert.ok(
      contact.includes(value),
      `missing existing contact behavior: ${value}`,
    );
  }

  assert.match(contact, /role="status" aria-live="polite"/);
  assert.match(contact, /disabled=\{submitting \|\| submitted\}/);
});
