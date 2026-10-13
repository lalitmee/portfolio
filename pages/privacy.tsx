import SiteLayout from '../components/SiteLayout';
import portfolio from '../data/portfolio.json';
import { useEffect, useState } from 'react';
import {
  readConsent,
  saveConsent,
  setAnalyticsConsent,
  trackEvent,
  type Consent,
} from '../utils/analytics';

export default function PrivacyPage() {
  const [choice, setChoice] = useState<Consent>('unknown');

  useEffect(() => {
    setChoice(
      readConsent({ getItem: (key) => window.localStorage.getItem(key) }),
    );
    const onChoice = (event: Event) => {
      const next = (event as CustomEvent<Consent>).detail;
      if (next === 'accepted' || next === 'declined' || next === 'unknown')
        setChoice(next);
    };
    window.addEventListener('portfolio-analytics-consent-change', onChoice);
    return () =>
      window.removeEventListener(
        'portfolio-analytics-consent-change',
        onChoice,
      );
  }, []);

  function choose(next: Consent) {
    saveConsent(
      { setItem: (key, value) => window.localStorage.setItem(key, value) },
      next,
    );
    setAnalyticsConsent(next);
    setChoice(next);
  }

  return (
    <SiteLayout
      title="Privacy"
      description="Privacy information for lalitmee.com."
    >
      <div className="page-content">
        <p className="eyebrow">Privacy</p>
        <h1 className="route-title">A small, clear privacy note.</h1>
        <section className="route-section">
          <h2>Contact</h2>
          <p>
            If you use the contact form, the details you provide are sent
            through the configured email service to deliver your message. You
            can also contact me directly at{' '}
            <a
              href={`mailto:${portfolio.contact.email}`}
              onClick={() =>
                trackEvent({ event: 'contact_click', channel: 'email' })
              }
            >
              {portfolio.contact.email}
            </a>
            .
          </p>
        </section>
        <section className="route-section">
          <h2>External services</h2>
          <p>
            Links to projects and the Markdown Previewer may take you to
            separately operated services. Their privacy practices are governed
            by those services.
          </p>
        </section>
        <section className="route-section">
          <h2>Analytics choices</h2>
          <p>
            Optional Google Analytics measurement is off unless you accept.
            Declining does not limit the site. You can change your choice at any
            time; withdrawal disables future measurement and clears accessible
            analytics cookies. No advertising cookies are used.
          </p>
          <p role="status" aria-live="polite">
            Current choice: {choice === 'unknown' ? 'not set' : choice}.
          </p>
          <div
            className="consent-actions"
            role="group"
            aria-label="Analytics settings"
          >
            <button
              type="button"
              className="button button-primary"
              onClick={() => choose('accepted')}
            >
              Accept analytics
            </button>
            <button
              type="button"
              className="button button-secondary"
              onClick={() => choose('declined')}
            >
              Decline analytics
            </button>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
