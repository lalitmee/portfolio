import emailjs from '@emailjs/browser';
import { FormEvent, useRef, useState } from 'react';
import { MdArrowForward } from 'react-icons/md';
import portfolioData from '../data/portfolio.json';
import {
  ContactFormErrors,
  ContactFormValues,
  validateContactForm,
} from '../utils/contactForm';
import { trackEvent } from '../utils/analytics';

const emptyForm: ContactFormValues & { company: string } = {
  name: '',
  email: '',
  company: '',
  subject: '',
  message: '',
};

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const email = portfolioData.contact.email;

  function update(name: keyof typeof emptyForm, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setStatus('');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus('Please correct the fields marked below.');
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey || !form.current) {
      setStatus(
        'The message service is unavailable. Your message is still here; you can email me instead.',
      );
      return;
    }

    setSubmitting(true);
    setStatus('Sending your message…');
    try {
      await emailjs.sendForm(serviceId, templateId, form.current, publicKey);
      setValues(emptyForm);
      setErrors({});
      setSubmitted(true);
      setStatus('Message sent. Thank you for getting in touch.');
    } catch {
      setStatus(
        'The message could not be sent. Your message is still here; you can email me instead.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  const mailto = `mailto:${email}?subject=${encodeURIComponent(values.subject || 'Hello')}&body=${encodeURIComponent(`${values.message}\n\n${values.name} (${values.email})`)}`;

  return (
    <div className="page-width content-page">
      <p className="eyebrow">Contact</p>
      <h1>Start with the problem you’re trying to solve.</h1>
      <p className="page-lede">
        For engineering roles, product work, consulting, or a useful
        conversation, send a note or reach me directly.
      </p>
      <div className="contact-grid">
        <form ref={form} onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={(e) => update('name', e.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'error-name' : undefined}
            />
            {errors.name && (
              <span className="field-error" id="error-name">
                {errors.name}
              </span>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => update('email', e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'error-email' : undefined}
            />
            {errors.email && (
              <span className="field-error" id="error-email">
                {errors.email}
              </span>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="contact-company">
              Company <span>(optional)</span>
            </label>
            <input
              id="contact-company"
              name="company"
              autoComplete="organization"
              value={values.company}
              onChange={(e) => update('company', e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="contact-subject">Subject</label>
            <input
              id="contact-subject"
              name="subject"
              value={values.subject}
              onChange={(e) => update('subject', e.target.value)}
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? 'error-subject' : undefined}
            />
            <input type="hidden" name="title" value={values.subject} />
            {errors.subject && (
              <span className="field-error" id="error-subject">
                {errors.subject}
              </span>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              minLength={10}
              value={values.message}
              onChange={(e) => update('message', e.target.value)}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'error-message' : undefined}
            />
            {errors.message && (
              <span className="field-error" id="error-message">
                {errors.message}
              </span>
            )}
          </div>
          <button
            className="button button-primary"
            type="submit"
            disabled={submitting || submitted}
          >
            {submitting
              ? 'Sending…'
              : submitted
                ? 'Message sent'
                : 'Send message'}
          </button>
          <p className="form-status" role="status" aria-live="polite">
            {status}
          </p>
          {status.includes('email me instead') && (
            <a className="text-link" href={mailto}>
              Open an email with your message{' '}
              <MdArrowForward aria-hidden="true" />
            </a>
          )}
        </form>
        <aside>
          <h2>Or reach me directly</h2>
          <p>
            <a
              href={`mailto:${email}`}
              onClick={() =>
                trackEvent({ event: 'contact_click', channel: 'email' })
              }
            >
              {email}
            </a>
          </p>
          <p>
            <a
              href="https://linkedin.com/in/lalitmee"
              onClick={() =>
                trackEvent({ event: 'contact_click', channel: 'linkedin' })
              }
            >
              LinkedIn
            </a>
          </p>
          <p>
            <a
              href="https://github.com/lalitmee"
              onClick={() =>
                trackEvent({ event: 'contact_click', channel: 'github' })
              }
            >
              GitHub
            </a>
          </p>
          <p>Based in Bengaluru, India.</p>
        </aside>
      </div>
    </div>
  );
}
