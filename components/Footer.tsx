import portfolio from '../data/portfolio.json';
import Link from 'next/link';
import { trackEvent } from '../utils/analytics';

export default function Footer(): React.ReactElement {
  return (
    <footer className="site-footer">
      <div>
        <strong>{portfolio.personal.name}</strong>
        <p>Senior Software Engineer · Frontend products, analytics, and developer tools</p>
      </div>
      <nav aria-label="Footer navigation">
        <Link href="/privacy/">Privacy</Link>
        <a href="/Lalit_Kumar_Resume.pdf" onClick={() => trackEvent({ event: 'resume_download' })}>Résumé</a>
        <a href={`mailto:${portfolio.contact.email}`} onClick={() => trackEvent({ event: 'contact_click', channel: 'email' })}>Email</a>
      </nav>
      <small>© {new Date().getFullYear()} Lalit Kumar</small>
    </footer>
  );
}
