import SiteLayout from '../components/SiteLayout';

export default function PrivacyPage() {
  return (
    <SiteLayout title="Privacy | Lalit Kumar" description="Privacy information for this personal website and its browser-based tools.">
      <article className="page-width content-page">
        <p className="eyebrow">Privacy</p>
        <h1>Your visit, your data.</h1>
        <section><h2>Website analytics</h2><p>This site may use Google Analytics 4 through Google Tag Manager only after you consent. If enabled, analytics measures aggregate page and interaction use. You can change your choice using the privacy controls in the footer.</p></section>
        <section><h2>Contact</h2><p>If you submit the contact form, the details you provide are sent through the configured email service to respond to your message. Do not include sensitive information.</p></section>
        <section><h2>Browser tools</h2><p>The Markdown Previewer processes selected files in your browser. The portfolio site does not receive the contents of those files.</p></section>
        <section><h2>Choices</h2><p>You can decline optional analytics. Essential site functionality does not depend on analytics consent.</p></section>
      </article>
    </SiteLayout>
  );
}
