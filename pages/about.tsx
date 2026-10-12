import Link from 'next/link';
import SiteLayout from '../components/SiteLayout';
import portfolioData from '../data/portfolio.json';
import { trackEvent } from '../utils/analytics';

export default function AboutPage() {
  return (
    <SiteLayout title="About | Lalit Kumar" description="Career, engineering interests, mentoring, and résumé for Lalit Kumar.">
      <div className="page-width content-page">
        <p className="eyebrow">About</p>
        <h1>Engineer by practice. Learner by habit.</h1>
        <p className="page-lede">I work across product interfaces and the systems behind them, from commerce journeys to developer tools and data-heavy applications.</p>
        <section>
          <h2>Career</h2>
          <ol className="career-list">{portfolioData.experience.map((job) => <li key={`${job.company}-${job.startDate}`}><div><h3>{job.position}</h3><p>{job.company} · {job.location}</p></div><time>{job.startDate} — {job.endDate}</time></li>)}</ol>
        </section>
        <section>
          <h2>Education</h2>
          <ul>{portfolioData.education.map((item) => <li key={`${item.institution}-${item.startDate}`}><strong>{item.degree}</strong> — {item.institution}, {item.startDate} — {item.endDate}</li>)}</ul>
        </section>
        <section>
          <h2>Community & learning</h2>
          <p>Mentored participants through Google Code-In with Sugar Labs and continue learning through personal tools, open-source work, and new technical domains.</p>
          <p><a href="https://github.com/lalitmee">Explore my work on GitHub</a></p>
        </section>
        <section className="resume-note">
          <h2>Résumé</h2>
          <p>The downloadable résumé is an older version and its experience summary may be out of date.</p>
          <a className="button button-outline" href={portfolioData.personal.resume} download onClick={() => trackEvent({ event: 'resume_download' })}>Download résumé (PDF)</a>
        </section>
        <p><Link className="text-link" href="/contact/">Get in touch →</Link></p>
      </div>
    </SiteLayout>
  );
}
