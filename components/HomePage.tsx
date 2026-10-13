import MarkdownDemo from './MarkdownDemo';
import Link from 'next/link';
import portfolio from '../data/portfolio.json';
import { caseStudies } from '../data/caseStudies';
import { generateSlug } from '../utils/slug';

const selectedProjects = portfolio.projects.filter(({ title }) =>
  ['browse.nvim', 'cobalt2.nvim', 'codecompanion-spinners.nvim', 'markdown-previewer', 'dotfiles'].includes(title),
);

export default function HomePage(): React.ReactElement {
  return (
    <div className="home-page">
      <section className="hero section-width" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Lalit Kumar · Senior Software Engineer</p>
          <h1 id="hero-title">Serious engineering.<br /><span>Room to explore.</span></h1>
          <p className="hero-description">
            I build thoughtful product interfaces, analytics integrations, and developer tools—with {portfolio.personal.yearsOfExperience} years of engineering experience.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/work/">Explore my work <span aria-hidden="true">→</span></Link>
            <Link className="button button-secondary" href="/contact/">Get in touch</Link>
          </div>
          <p className="hero-context">Currently building product experiences at Nykaa · Previously Quartic.ai</p>
        </div>
        <div className="hero-aside" aria-label="Career highlights">
          <span className="hero-number">8<span>+</span></span>
          <p>years turning complex product needs into useful software</p>
          <div className="hero-rule" />
          <p><strong>Focus</strong><br />Frontend systems · Product analytics · Developer experience</p>
        </div>
      </section>

      <section className="section-width evidence-section" aria-labelledby="work-title">
        <div className="section-heading">
          <div><p className="eyebrow">Selected work</p><h2 id="work-title">Product work, with the details intact.</h2></div>
          <Link className="text-link" href="/work/">All case studies <span aria-hidden="true">→</span></Link>
        </div>
        <div className="case-list">
          {caseStudies.map((study, index) => (
            <Link className="case-row" href={`/work/${study.slug}/`} key={study.slug}>
              <span className="case-index">0{index + 1}</span>
              <span><strong>{study.title}</strong><small>{study.employer} · {study.period}</small></span>
              <span className="case-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="section-width demo-section"><MarkdownDemo /></div>

      <section className="section-width projects-section" aria-labelledby="projects-title">
        <div className="section-heading">
          <div><p className="eyebrow">Independent work</p><h2 id="projects-title">Tools and experiments I maintain.</h2></div>
          <Link className="text-link" href="/projects/">Project archive <span aria-hidden="true">→</span></Link>
        </div>
        <ul className="project-list">
          {selectedProjects.map((project) => (
            <li key={project.id}><Link href={`/projects/${generateSlug(project.title)}/`}>{project.title}</Link><span>{project.description}</span></li>
          ))}
        </ul>
        <Link className="app-callout" href="/apps/markdown-preview/">
          <span><strong>Markdown Previewer</strong><small>A local-first place to read and edit Markdown files.</small></span>
          <span aria-hidden="true">Launch app ↗</span>
        </Link>
      </section>
    </div>
  );
}
