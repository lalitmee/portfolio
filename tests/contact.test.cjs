const assert = require('node:assert/strict');
const test = require('node:test');
const { deliverContactMessage } = require('../utils/contact.ts');

const fields = {
  name: 'Ada Example',
  email: 'ada@example.com',
  subject: 'A question',
  message: 'This is a long enough message.',
};

test('missing EmailJS configuration never attempts a send', async () => {
  let calls = 0;
  const result = await deliverContactMessage(fields, {}, async () => calls++);
  assert.equal(result, 'not-configured');
  assert.equal(calls, 0);
});

test('rejected EmailJS send is reported without losing the submitted fields', async () => {
  let sentFields;
  const result = await deliverContactMessage(
    fields,
    { serviceId: 'service', templateId: 'template', publicKey: 'public' },
    async (data) => {
      sentFields = data;
      throw new Error('offline');
    },
  );
  assert.equal(result, 'failed');
  assert.equal(sentFields, fields);
});
