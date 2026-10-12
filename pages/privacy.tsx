import SiteLayout from '../components/SiteLayout';

export default function PrivacyPage() {
  return (
    <SiteLayout title="Privacy | Lalit Kumar" description="Privacy information for this personal website and its browser-based tools.">
      <article className="page-width content-page">
        <p className="eyebrow">Privacy</p>
        <h1>Your visit, your data.</h1>
        <section><h2>Website analytics</h2><p>When configured, Google Analytics 4 loads through Google Tag Manager only after you accept optional analytics. Events contain page paths and the limited interaction categories described here—not names, email addresses, form text, or tool contents. Declining or withdrawing consent stops custom measurement events; deleting cookies in your browser is also available.</p><p>Use the analytics settings control below to accept or decline. If analytics IDs are not configured, no Google tags are loaded.</p></section>
        <section><h2>Contact</h2><p>If you submit the contact form, the details you provide are sent through the configured email service to respond to your message. Do not include sensitive information.</p></section>
        <section><h2>Browser tools</h2><p>The Markdown Previewer processes selected files in your browser. The portfolio site does not receive the contents of those files.</p></section>
        <section><h2>Choices</h2><p>You can decline optional analytics or change your choice here at any time. Essential site functionality does not depend on analytics consent.</p></section>
      </article>
    </SiteLayout>
  );
}
