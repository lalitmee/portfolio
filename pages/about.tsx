import Link from 'next/link';
import { SiteLayout } from '../components/SiteLayout';
import portfolio from '../data/portfolio.json';
import { trackEvent } from '../utils/analytics';

const capabilities = [
  'React',
  'TypeScript',
  'JavaScript',
  'Next.js',
  'Redux',
  'Angular',
  'Node.js',
  'Python',
  'GraphQL',
  'REST APIs',
  'BigQuery',
  'Neovim',
];

export default function AboutPage() {
  return (
    <SiteLayout
      title="About"
      description="Career history, practical capabilities, and résumé."
    >
      <div className="page-content">
        <p className="eyebrow">ABOUT</p>
        <h1>Product-minded software engineering.</h1>
        <p className="page-intro">
          {portfolio.personal.bio} I bring 8+ years of experience across product
          engineering and developer tools.
        </p>
        <section className="content-section">
          <h2>Career</h2>
          <ol className="timeline">
            {portfolio.experience.map((role) => (
              <li key={role.company}>
                <p className="mono-label">
                  {role.startDate} — {role.endDate}
                </p>
                <h3>
                  {role.position}, {role.company}
                </h3>
                <p>{role.description}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="content-section">
          <h2>Practical capabilities</h2>
          <ul className="tool-list">
            {capabilities.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>
        <section className="content-section">
          <h2>Mentoring and education</h2>
          <p>Google Code-In mentor with Sugar Labs.</p>
          {portfolio.education.map((item) => (
            <article className="list-item" key={item.institution}>
              <h3>
                {item.degree}, {item.institution}
              </h3>
              <p>
                {item.startDate} — {item.endDate} · {item.location}
              </p>
            </article>
          ))}
        </section>
        <section className="content-section">
          <h2>Résumé</h2>
          <p>
            The attached PDF still has an older 6+ years summary; this site
            reflects 8+ years.
          </p>
          <a
            className="button button-secondary"
            download
            href={portfolio.personal.resume}
            onClick={() => trackEvent({ event: 'resume_download' })}
          >
            Download résumé (PDF)
          </a>
        </section>
        <p>
          <Link className="text-link" href="/contact/">
            Get in touch →
          </Link>
        </p>
      </div>
    </SiteLayout>
  );
}
