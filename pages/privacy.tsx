import { SiteLayout } from '../components/SiteLayout';

export default function PrivacyPage() {
  return (
    <SiteLayout title="Privacy" description="How analytics consent and personal data are handled.">
      <div className="page-content">
        <p className="eyebrow">PRIVACY</p>
        <h1>Your visit, your choice.</h1>
        <section className="content-section">
          <h2>Analytics</h2>
          <p>Optional analytics will be loaded only after you opt in. Declining does not limit access to pages, project links, the résumé, or contact details.</p>
          <p>You can change your choice at any time using the analytics settings on this page.</p>
          <div id="analytics-settings" />
        </section>
        <section className="content-section">
          <h2>Contact form</h2>
          <p>Messages are sent through EmailJS only when the form has been configured. If it is unavailable, the page provides a direct email link instead.</p>
        </section>
      </div>
    </SiteLayout>
  );
}
