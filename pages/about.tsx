import Image from 'next/image';
import Link from 'next/link';
import { MdWorkOutline, MdSchool, MdDescription } from 'react-icons/md';
import DirectionalArrow from '../components/DirectionalArrow';
import SiteLayout from '../components/SiteLayout';
import portfolioData from '../data/portfolio.json';
import { trackEvent } from '../utils/analytics';

export default function AboutPage() {
  return (
    <SiteLayout
      title="About | Lalit Kumar"
      description="Career, engineering interests, mentoring, and resume for Lalit Kumar."
    >
      <div className="page-width content-page">
        <section className="about-intro">
          <div>
            <p className="eyebrow">About · Bengaluru, India</p>
            <h1>Engineer by practice. Learner by habit.</h1>
            <p className="page-lede">
              I work across product interfaces and the systems behind them, from
              commerce journeys to developer tools and data-heavy applications.
            </p>
          </div>
          <Image
            className="about-portrait"
            src="/images/profile_v3.png"
            alt="Lalit Kumar"
            width={440}
            height={440}
            priority
          />
        </section>
        <section>
          <h2 className="about-section-heading">
            <MdWorkOutline aria-hidden="true" /> Career
          </h2>
          <ol className="career-timeline">
            {portfolioData.experience.map((job) => (
              <li
                className={job.current ? 'is-current' : undefined}
                key={`${job.company}-${job.startDate}`}
              >
                <div>
                  <h3>{job.position}</h3>
                  {job.current && (
                    <span className="career-current">Current</span>
                  )}
                  <p>
                    {job.company} · {job.location}
                  </p>
                </div>
                <time>
                  {job.startDate} — {job.endDate}
                </time>
              </li>
            ))}
          </ol>
        </section>
        <section className="education-community">
          <h2 className="about-section-heading">
            <MdSchool aria-hidden="true" /> Education &amp; community
          </h2>
          <ul className="education-list">
            {portfolioData.education.map((item) => (
              <li
                className="education-card"
                key={`${item.institution}-${item.startDate}`}
              >
                <Image
                  src={item.image}
                  alt={`${item.institution} logo`}
                  width={72}
                  height={72}
                />
                <div>
                  <strong>{item.degree}</strong>
                  <p>
                    {item.institution} · {item.startDate} — {item.endDate}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="community-note">
            <p>
              Mentored participants through Google Code-In with Sugar Labs and
              continue learning through personal tools, open-source work, and
              new technical domains.
            </p>
            <p>
              <a
                className="button button-outline section-button"
                href="https://github.com/lalitmee"
                onPointerEnter={(event) => {
                  const button = event.currentTarget;
                  const bounds = button.getBoundingClientRect();
                  button.style.setProperty('--reveal-x', `${event.clientX - bounds.left + 1}px`);
                  button.style.setProperty('--reveal-y', `${event.clientY - bounds.top + 1}px`);
                }}
              >
                Explore my work on GitHub{' '}
                <DirectionalArrow direction="forward" />
                <span className="section-button-fill" aria-hidden="true">
                  Explore my work on GitHub{' '}
                  <DirectionalArrow direction="forward" />
                </span>
              </a>
            </p>
          </div>
        </section>
        <section className="resume-note">
          <h2 className="about-section-heading">
            <MdDescription aria-hidden="true" /> Resume
          </h2>
          <p>The PDF is an older version and may be out of date.</p>
          <div className="resume-actions">
            <a
              className="text-link"
              href={portfolioData.personal.resume}
              download
              onClick={() => trackEvent({ event: 'resume_download' })}
            >
              Download PDF <DirectionalArrow direction="forward" />
            </a>
            <Link className="text-link" href="/contact/">
              Get in touch <DirectionalArrow direction="forward" />
            </Link>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
