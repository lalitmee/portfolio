import emailjs from '@emailjs/browser';
import type { FormEvent } from 'react';
import { useRef, useState } from 'react';
import SiteLayout from '../components/SiteLayout';
import portfolio from '../data/portfolio.json';
import { validateContactForm } from '../utils/contactValidation';
import { submitContactForm } from '../utils/contactSubmission';

type FieldName = 'name' | 'email' | 'subject' | 'message';
const fields: { name: FieldName; label: string; type: string }[] = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'subject', label: 'Subject', type: 'text' },
  { name: 'message', label: 'Message', type: 'textarea' },
];

export default function ContactPage() {
  const form = useRef<HTMLFormElement>(null);
  const sending = useRef(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.current || sending.current) return;
    const data = new FormData(form.current);
    const values = Object.fromEntries(fields.map(({ name }) => [name, String(data.get(name) || '')])) as Record<FieldName, string>;
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    setStatus('');
    if (Object.keys(nextErrors).length) return;

    const { NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, NEXT_PUBLIC_EMAILJS_PUBLIC_KEY } = process.env;
    if (!NEXT_PUBLIC_EMAILJS_SERVICE_ID || !NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || !NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      setStatus('The message form is not configured right now. Please use the email link instead.');
      return;
    }

    sending.current = true;
    setBusy(true);
    try {
      const title = form.current.elements.namedItem('title') as HTMLInputElement;
      title.value = values.subject;
      const sent = await submitContactForm(form.current, () => emailjs.sendForm(
        NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form.current!,
        NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      ));
      setStatus(sent
        ? 'Your message was sent. Thank you.'
        : 'Your message could not be sent. Your entries are still here; please try again or use the email link.');
    } catch {
      setStatus('Your message could not be sent. Your entries are still here; please try again or use the email link.');
    } finally {
      sending.current = false;
      setBusy(false);
    }
  }

  return (
    <SiteLayout title="Contact" description="Get in touch with Lalit Kumar.">
      <div className="page-content">
        <p className="eyebrow">Contact</p>
        <h1 className="route-title">Have a useful problem to solve?</h1>
        <p className="route-intro">Send a note about the work you have in mind.</p>
        <p><a href={`mailto:${portfolio.contact.email}`}>Email {portfolio.contact.email}</a></p>
        <form className="contact-form" ref={form} onSubmit={submit} noValidate>
          <input type="hidden" name="title" defaultValue="" />
          <div className="error-summary" role="alert" aria-live="polite">{Object.values(errors).join('. ')}</div>
          {fields.map(({ name, label, type }) => {
            const id = `contact-${name}`;
            return <div className="form-field" key={name}>
              <label htmlFor={id}>{label}</label>
              {type === 'textarea'
                ? <textarea id={id} name={name} rows={6} required aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${id}-error` : undefined} />
                : <input id={id} name={name} type={type} required autoComplete={name === 'name' || name === 'email' ? name : undefined} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${id}-error` : undefined} />}
              {errors[name] && <span className="field-error" id={`${id}-error`}>{errors[name]}</span>}
            </div>;
          })}
          <button className="button button-primary" type="submit" disabled={busy}>{busy ? 'Sending…' : 'Send message'}</button>
          <p className="form-status" role="status" aria-live="polite">{status}</p>
        </form>
      </div>
    </SiteLayout>
  );
}
