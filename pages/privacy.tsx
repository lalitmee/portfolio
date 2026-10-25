import SiteLayout from '../components/SiteLayout';
import portfolioData from '../data/portfolio.json';

export default function PrivacyPage() {
  return (
    <SiteLayout
      title="Privacy | Lalit Kumar"
      description="How this portfolio handles optional analytics and contact messages, and how to manage your choices."
    >
      <article className="page-width content-page">
        <p className="eyebrow">Privacy</p>
        <h1>Your visit, your data.</h1>
        <section>
          <h2>Optional analytics</h2>
          <p>
            If you accept analytics, this portfolio loads Google Analytics to
            help me understand which pages, projects, and tools visitors find
            useful. It records page visits and interactions such as opening a
            project, downloading my résumé, or clicking a contact link.
          </p>
          <p>
            The interaction details this portfolio sends do not include your
            name, email address, or contact message. Google Analytics may use
            cookies and process information about your browser and device. See{' '}
            <a href="https://policies.google.com/privacy">
              Google’s privacy policy
            </a>{' '}
            for information about how Google handles data.
          </p>
        </section>
        <section>
          <h2>Contact messages</h2>
          <p>
            When you use the contact form, your name, email address, subject,
            and message are sent through EmailJS to my email inbox so I can
            respond. Please do not include passwords or other sensitive
            information. You can read{' '}
            <a href="https://www.emailjs.com/legal/privacy-policy/">
              EmailJS’s privacy policy
            </a>{' '}
            for details about its processing.
          </p>
        </section>
        <section>
          <h2>Your choices</h2>
          <p>
            You can browse this portfolio and use the contact form without
            accepting analytics. Your analytics choice is saved in this browser
            so you do not need to choose on every visit.
          </p>
          <p>
            Use the analytics settings control on this page to change your
            choice at any time. Declining stops this portfolio’s analytics
            events; it does not delete information already sent to Google.
          </p>
        </section>
        <section>
          <h2>Privacy questions</h2>
          <p>
            For questions about your information or to request deletion of a
            contact message, email me at{' '}
            <a href={`mailto:${portfolioData.contact.email}`}>
              {portfolioData.contact.email}
            </a>
            .
          </p>
        </section>
      </article>
    </SiteLayout>
  );
}
