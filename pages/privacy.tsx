import SiteLayout from '../components/SiteLayout';
import portfolio from '../data/portfolio.json';

export default function PrivacyPage() {
  return (
    <SiteLayout title="Privacy" description="Privacy information for lalitmee.com.">
      <div className="page-content">
        <p className="eyebrow">Privacy</p>
        <h1 className="route-title">A small, clear privacy note.</h1>
        <section className="route-section"><h2>Contact</h2><p>If you use the contact form, the details you provide are sent through the configured email service to deliver your message. You can also contact me directly at <a href={`mailto:${portfolio.contact.email}`}>{portfolio.contact.email}</a>.</p></section>
        <section className="route-section"><h2>External services</h2><p>Links to projects and the Markdown Previewer may take you to separately operated services. Their privacy practices are governed by those services.</p></section>
        <section className="route-section"><h2>Analytics choices</h2><p>Any optional analytics controls and details will be shown here when available. No choice is required to browse this site.</p></section>
      </div>
    </SiteLayout>
  );
}
