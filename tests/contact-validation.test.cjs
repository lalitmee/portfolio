const assert = require('node:assert/strict');
const { test } = require('node:test');
const { validateContactForm } = require('../utils/contactValidation.ts');
const { submitContactForm } = require('../utils/contactSubmission.ts');

test('contact form requires valid name, email, subject, and a 10-character message', () => {
  assert.deepEqual(
    validateContactForm({
      name: '',
      email: 'bad',
      subject: ' ',
      message: 'short',
    }),
    {
      name: 'Name is required',
      email: 'Please enter a valid email address',
      subject: 'Subject is required',
      message: 'Message must be at least 10 characters.',
    },
  );
  assert.deepEqual(
    validateContactForm({
      name: ' Ada ',
      email: 'ada@example.com',
      subject: 'Hello',
      message: '1234567890',
    }),
    {},
  );
});

test('a rejected contact send preserves entered fields', async () => {
  let resets = 0;
  const sent = await submitContactForm({ reset: () => resets++ }, async () => {
    throw new Error('offline');
  });
  assert.equal(sent, false);
  assert.equal(resets, 0);
});
