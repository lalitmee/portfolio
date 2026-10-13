import Link from 'next/link';
import SiteLayout from '../../components/SiteLayout';
import portfolio from '../../data/portfolio.json';
import { generateSlug } from '../../utils/slug';

const selected = ['browse.nvim', 'cobalt2.nvim', 'codecompanion-spinners.nvim', 'markdown-previewer', 'dotfiles'];

export default function ProjectsPage() {
  const projects = portfolio.projects.filter((project) => selected.includes(project.title));
  const earlier = portfolio.projects.filter((project) => !selected.includes(project.title));
  return (
    <SiteLayout title="Projects" description="Open-source tools and earlier experiments.">
      <div className="page-content">
        <p className="eyebrow">Independent work</p>
        <h1 className="route-title">Tools and experiments I maintain.</h1>
        <div className="project-cards">
          {projects.map((project) => (
            <article className="content-card" key={project.title}>
              <p className="eyebrow">{project.category}</p>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <p className="tag-list">{project.technologies.join(' · ')}</p>
              <div className="link-row">
                {project.github && <a href={project.github}>Source on GitHub ↗</a>}
                {project.demo && <Link href={project.demo.startsWith('/') ? project.demo : `/projects/${generateSlug(project.title)}/`}>Open project ↗</Link>}
              </div>
              {project.title === 'cobalt2.nvim' && <small>Theme by Wes Bos; Neovim adaptation by Gertjan Reynaert and contributors.</small>}
            </article>
          ))}
        </div>
        <section className="route-section">
          <h2>Earlier experiments</h2>
          <ul className="archive-list">{earlier.map((project) => <li key={project.title}><Link href={`/projects/${generateSlug(project.title)}/`}>{project.title}</Link><span>{project.description}</span></li>)}</ul>
        </section>
      </div>
    </SiteLayout>
  );
}
