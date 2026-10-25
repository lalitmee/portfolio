import emailjs from '@emailjs/browser';
import { FormEvent, useEffect, useRef, useState } from 'react';
import {
  GithubIcon,
  LinkedinIcon,
  EmailIcon,
  LocationIcon,
  SendIcon,
  TopmateIcon,
  CheckIcon,
} from './icons/AnimatedIcons';
import DirectionalArrow from './DirectionalArrow';
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
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ id: number; message: string } | null>(
    null,
  );
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const email = portfolioData.contact.email;

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

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
      setStatus('');
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      setToast({ id: Date.now(), message: 'Message sent' });
      toastTimeoutRef.current = setTimeout(() => {
        setToast(null);
      }, 5000);
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
            className={`button button-primary send-button ${submitting ? 'is-submitting' : ''}`.trim()}
            type="submit"
            disabled={submitting}
          >
            <span className="send-label">
              {submitting ? 'Sending…' : 'Send message'}
            </span>
            <span className="send-icon" aria-hidden="true">
              <SendIcon className="send-plane" />
            </span>
          </button>
          <p className="form-status" role="status" aria-live="polite">
            {status}
          </p>
          {status.includes('email me instead') && (
            <a className="text-link" href={mailto}>
              Open an email with your message{' '}
              <DirectionalArrow direction="forward" />
            </a>
          )}
        </form>
        {toast && (
          <aside className="contact-toast" role="status" aria-live="polite">
            <CheckIcon className="toast-icon" aria-hidden="true" />
            <div className="toast-content">
              <p className="toast-title">Message sent</p>
              <p className="toast-body">
                Thank you for reaching out. I'll get back to you shortly.
              </p>
            </div>
            <button
              type="button"
              className="toast-dismiss"
              onClick={() => setToast(null)}
              aria-label="Dismiss notification"
            >
              ✕
            </button>
          </aside>
        )}
        <aside>
          <h2>Or reach me directly</h2>
          <p>
            <a
              href={`mailto:${email}`}
              onClick={() =>
                trackEvent({ event: 'contact_click', channel: 'email' })
              }
            >
              <EmailIcon aria-hidden="true" /> {email}
            </a>
          </p>
          <p>
            <a
              href="https://topmate.io/lalitmee"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent({ event: 'contact_click', channel: 'topmate' })
              }
            >
              <TopmateIcon aria-hidden="true" /> Topmate
            </a>
          </p>
          <p>
            <a
              href="https://linkedin.com/in/lalitmee"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent({ event: 'contact_click', channel: 'linkedin' })
              }
            >
              <LinkedinIcon aria-hidden="true" /> LinkedIn
            </a>
          </p>
          <p>
            <a
              href="https://github.com/lalitmee"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent({ event: 'contact_click', channel: 'github' })
              }
            >
              <GithubIcon aria-hidden="true" /> GitHub
            </a>
          </p>
          <p className="contact-location icon-label">
            <LocationIcon aria-hidden="true" /> Based in Bengaluru, India.
          </p>
        </aside>
      </div>
    </div>
  );
}
