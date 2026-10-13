import { SiteLayout } from '../components/SiteLayout';
import ContactForm from '../components/ContactForm';
import portfolio from '../data/portfolio.json';
import { trackEvent } from '../utils/analytics';

export default function ContactPage() {
  return (
    <SiteLayout title="Contact" description="Send a message or use a direct contact link.">
      <div className="page-content">
        <p className="eyebrow">CONTACT</p>
        <h1>Get in touch.</h1>
        <p className="page-intro">Use the form or contact me directly. No availability or response-time promise is assumed.</p>
        <ContactForm />
        <div className="social-links">
          {portfolio.contact.social.filter(({ platform }) => ['GitHub', 'LinkedIn'].includes(platform)).map(({ platform, url }) => (
            <a className="text-link" href={url} key={platform} onClick={() => trackEvent({ event: 'contact_click', channel: platform.toLowerCase() as 'github' | 'linkedin' })} rel="noreferrer" target="_blank">{platform} ↗</a>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
