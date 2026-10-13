import SiteLayout from '../components/SiteLayout';
import portfolio from '../data/portfolio.json';
import { trackEvent } from '../utils/analytics';

export default function AboutPage() {
  return (
    <SiteLayout
      title="About"
      description="Experience, interests, and education of Lalit Kumar."
    >
      <div className="page-content">
        <p className="eyebrow">About</p>
        <h1 className="route-title">I make complex software easier to use.</h1>
        <p className="route-intro">
          I’m Lalit, a software engineer working across frontend products,
          analytics integrations, and developer tools.
        </p>
        <section className="route-section">
          <h2>Experience</h2>
          <ol className="timeline">
            {portfolio.experience.map((job) => (
              <li key={job.company}>
                <p className="eyebrow">
                  {job.startDate}–{job.endDate}
                </p>
                <h3>
                  {job.position} · {job.company}
                </h3>
                <p>{job.description}</p>
                <ul>
                  {job.achievements.slice(0, 3).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>
        <section className="route-section">
          <h2>Capabilities</h2>
          <p>
            Frontend systems and product interfaces · analytics integrations ·
            data-rich applications · developer experience.
          </p>
        </section>
        <section className="route-section">
          <h2>Mentoring</h2>
          <p>
            Mentored junior developers while leading frontend work at KoineArth
            and volunteered as a Google Code-In mentor with Sugar Labs.
          </p>
        </section>
        <section className="route-section">
          <h2>Education</h2>
          {portfolio.education.map((item) => (
            <div className="content-card" key={item.institution}>
              <h3>{item.degree}</h3>
              <p>
                {item.institution} · {item.startDate}–{item.endDate}
              </p>
            </div>
          ))}
        </section>
        <section className="route-section">
          <h2>Résumé</h2>
          <p>
            <a
              href={portfolio.personal.resume}
              onClick={() => trackEvent({ event: 'resume_download' })}
            >
              Download résumé (PDF)
            </a>
          </p>
          <p className="route-note">
            The PDF is retained as a document; its experience summary predates
            this page.
          </p>
        </section>
      </div>
    </SiteLayout>
  );
}
