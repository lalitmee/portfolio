import { SiteLayout } from '../components/SiteLayout';
import { AnalyticsSettings } from '../components/AnalyticsConsent';

export default function PrivacyPage() {
  return (
    <SiteLayout
      title="Privacy"
      description="How analytics consent and personal data are handled."
    >
      <div className="page-content">
        <p className="eyebrow">PRIVACY</p>
        <h1>Your visit, your choice.</h1>
        <section className="content-section">
          <h2>Analytics</h2>
          <p>
            Optional, privacy-limited analytics use one Google Tag Manager
            container to deliver GA4 only after you opt in. Advertising remains
            disabled. No emails, form contents, raw URLs, query strings, or
            fragments are sent. Declining does not limit access to pages,
            project links, the résumé, or contact details.
          </p>
          <p>
            You can change or withdraw your choice at any time below. Withdrawal
            blocks future events and clears accessible analytics cookies; it
            cannot retract data already sent.
          </p>
          <AnalyticsSettings />
        </section>
        <section className="content-section">
          <h2>Contact form</h2>
          <p>
            Messages are sent through EmailJS only when the form has been
            configured. If it is unavailable, the page provides a direct email
            link instead.
          </p>
        </section>
      </div>
    </SiteLayout>
  );
}
