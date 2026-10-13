import Link from 'next/link';
import { caseStudies } from '../data/caseStudies';
import portfolioData from '../data/portfolio.json';

const tools = ['React', 'TypeScript', 'Next.js', 'Node.js', 'Neovim'];

export default function HomePage() {
  const featuredCase = caseStudies[0];

  return (
    <div className="home-content">
      <section aria-labelledby="home-title" className="hero">
        <p className="eyebrow">PRODUCT ENGINEERING · DEVELOPER TOOLS</p>
        <h1 id="home-title">
          Reliable products. Sharper tools. Clear engineering.
        </h1>
        <p className="hero-summary">
          I’m {portfolioData.personal.name}, a senior software engineer with{' '}
          {portfolioData.personal.yearsOfExperience} years of experience working
          across product reliability, measurement systems, and developer tools.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/work">
            Explore my work
          </Link>
          <Link className="button button-secondary" href="/contact">
            Get in touch
          </Link>
        </div>
      </section>

      <section aria-labelledby="featured-title" className="content-section">
        <div className="section-heading">
          <p className="eyebrow">SELECTED CASE STUDY</p>
          <h2 id="featured-title">Product work, grounded in the details.</h2>
        </div>
        <article className="feature-card">
          <div>
            <p className="mono-label">
              {featuredCase.employer} · {featuredCase.period}
            </p>
            <h3>{featuredCase.title}</h3>
            <p>{featuredCase.summary}</p>
          </div>
          <Link className="text-link" href={`/work/${featuredCase.slug}`}>
            Read the case study <span aria-hidden="true">→</span>
          </Link>
        </article>
      </section>

      <section aria-labelledby="tools-title" className="content-section tools-section">
        <div className="section-heading">
          <p className="eyebrow">TOOLS I WORK WITH</p>
          <h2 id="tools-title">A practical engineering toolkit.</h2>
        </div>
        <ul className="tool-list">
          {tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="career-title" className="career-summary">
        <p className="eyebrow">CAREER</p>
        <h2 id="career-title">From product interfaces to platform workflows.</h2>
        <p>
          Over {portfolioData.personal.yearsOfExperience} years, I’ve worked on
          web products at Cognitive Clouds, KoineArth, Quartic.ai, and Nykaa.
          My focus is making complex product behavior clearer and more reliable.
        </p>
        <Link className="text-link" href="/about">
          More about my experience <span aria-hidden="true">→</span>
        </Link>
      </section>
    </div>
  );
}
