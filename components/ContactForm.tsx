import emailjs from '@emailjs/browser';
import { FormEvent, useState } from 'react';
import portfolioData from '../data/portfolio.json';
import { trackEvent } from '../utils/analytics';
import { ContactFields, deliverContactMessage } from '../utils/contact';

const emptyFields: ContactFields = {
  name: '',
  email: '',
  company: '',
  subject: '',
  message: '',
};

export default function ContactForm() {
  const [fields, setFields] = useState<ContactFields>(emptyFields);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const update = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFields((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setMessage('');

    const result = await deliverContactMessage(
      fields,
      {
        serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      },
      (data, config) =>
        emailjs.send(config.serviceId, config.templateId, { ...data }, {
          publicKey: config.publicKey,
        }),
    );

    if (result === 'sent') {
      setFields(emptyFields);
      setMessage('Message sent. Thank you.');
    } else if (result === 'not-configured') {
      setMessage('The message form is not configured. Please email me directly.');
    } else {
      setMessage('Message could not be sent. Your entries are still here; please email me directly.');
    }
    setSubmitting(false);
  };

  return (
    <form className="contact-form" onSubmit={submit}>
      <label>
        Name <span aria-hidden="true">*</span>
        <input autoComplete="name" name="name" onChange={update} required value={fields.name} />
      </label>
      <label>
        Email <span aria-hidden="true">*</span>
        <input autoComplete="email" name="email" onChange={update} required type="email" value={fields.email} />
      </label>
      <label>
        Company
        <input autoComplete="organization" name="company" onChange={update} value={fields.company} />
      </label>
      <label>
        Subject <span aria-hidden="true">*</span>
        <input name="subject" onChange={update} required value={fields.subject} />
      </label>
      <label>
        Message <span aria-hidden="true">*</span>
        <textarea minLength={10} name="message" onChange={update} required rows={6} value={fields.message} />
      </label>
      <button className="button button-primary" disabled={submitting} type="submit">
        {submitting ? 'Sending…' : 'Send message'}
      </button>
      <p aria-live="polite" className="form-message" role="status">{message}</p>
      <p>
        Prefer email? <a className="text-link" href={`mailto:${portfolioData.contact.email}`} onClick={() => trackEvent({ event: 'contact_click', channel: 'email' })}>{portfolioData.contact.email}</a>
      </p>
    </form>
  );
}
