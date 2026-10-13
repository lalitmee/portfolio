import Image from 'next/image';
import Link from 'next/link';
import { MdArrowForward, MdArrowOutward } from 'react-icons/md';
import SiteLayout from '../components/SiteLayout';
import { caseStudies } from '../data/caseStudies';
import portfolio from '../data/portfolio.json';
import { trackEvent } from '../utils/analytics';
import { generateSlug } from '../utils/slug';

const selectedProjects = [
  'browse.nvim',
  'cobalt2.nvim',
  'codecompanion-spinners.nvim',
  'markdown-previewer',
  'dotfiles',
].map(
  (title) => portfolio.projects.find((project) => project.title === title)!,
);

export default function Home() {
  return (
    <SiteLayout
      title="Lalit Kumar — Senior Software Engineer"
      description="Lalit Kumar is a senior software engineer building product experiences, useful tools, and dependable web interfaces."
    >
      <section className="home-hero page-width" aria-labelledby="home-title">
        <div className="hero-copy">
          <p className="eyebrow">
            Lalit Kumar <span>·</span> Senior Software Engineer
          </p>
          <h1 id="home-title">
            Thoughtful interfaces. Useful tools. Engineering that holds up.
          </h1>
          <p className="hero-intro">
            I build web products, commerce experiences, and developer tools. My
            work spans product teams and open source, backed by 8+ years in
            software engineering.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/work/">
              Explore my work <MdArrowOutward aria-hidden="true" />
            </Link>
            <Link className="text-link" href="/contact/">
              Get in touch <MdArrowForward aria-hidden="true" />
            </Link>
          </div>
          <p className="hero-note">
            Currently building commerce experiences at Nykaa.
          </p>
        </div>
        <div className="hero-portrait">
          <Image
            src="/images/profile_v3.png"
            alt="Lalit Kumar"
            width={440}
            height={440}
            priority
            sizes="(max-width: 760px) 72vw, 34vw"
          />
          <span className="portrait-caption">Bengaluru, India</span>
        </div>
      </section>

      <section
        className="content-section section-rule"
        aria-labelledby="work-title"
      >
        <div className="page-width">
          <div className="section-heading">
            <p className="eyebrow">01 / Selected work</p>
            <h2 id="work-title">Problems worth working through.</h2>
            <p>
              Product details, measurement systems, and dense interfaces—built
              with the people using them in mind.
            </p>
          </div>
          <div className="case-list">
            {caseStudies.map((study, index) => (
              <Link
                className="case-row"
                href={`/work/${study.slug}/`}
                key={study.slug}
              >
                <span className="case-index">0{index + 1}</span>
                <div>
                  <p className="case-meta">
                    {study.employer} <span>·</span> {study.period}
                  </p>
                  <h3>{study.title}</h3>
                  <p>{study.summary}</p>
                </div>
                <span className="row-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            ))}
          </div>
          <Link className="text-link section-link" href="/work/">
            All professional work <MdArrowForward aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section
        className="content-section section-tint"
        aria-labelledby="projects-title"
      >
        <div className="page-width">
          <div className="section-heading section-heading-inline">
            <div>
              <p className="eyebrow">02 / Independent work</p>
              <h2 id="projects-title">Tools shaped by daily use.</h2>
            </div>
            <Link className="text-link" href="/projects/">
              Browse projects <MdArrowForward aria-hidden="true" />
            </Link>
          </div>
          <div className="project-list">
            {selectedProjects.map((project) => (
              <Link
                className="project-link"
                href={`/projects/${generateSlug(project.title)}/`}
                key={project.title}
              >
                <span>{project.category}</span>
                <strong>{project.title}</strong>
                <span className="row-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className="content-section app-feature"
        aria-labelledby="apps-title"
      >
        <div className="page-width app-feature-inner">
          <div>
            <p className="eyebrow">03 / A tool you can use</p>
            <h2 id="apps-title">Markdown Previewer</h2>
            <p>
              Preview local Markdown files, explore folders, and work with
              Mermaid diagrams and tables.
            </p>
          </div>
          <Link
            className="button button-outline"
            href="/apps/markdown-preview/"
            onClick={() =>
              trackEvent({ event: 'app_launch', app_slug: 'markdown-preview' })
            }
          >
            Open the app <MdArrowOutward aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section
        className="content-section section-rule"
        aria-labelledby="career-title"
      >
        <div className="page-width career-strip">
          <div>
            <p className="eyebrow">04 / A little context</p>
            <h2 id="career-title">Eight years across product teams.</h2>
          </div>
          <p>Nykaa · Quartic.ai · KoineArth · Cognitive Clouds</p>
          <Link className="text-link" href="/about/">
            Career and background <MdArrowForward aria-hidden="true" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
