import Link from 'next/link';
import { SiteLayout } from '../../components/SiteLayout';
import portfolio from '../../data/portfolio.json';
import { generateSlug } from '../../utils/slug';

const selected = new Set([
  'browse-nvim',
  'cobalt2-nvim',
  'codecompanion-spinners-nvim',
  'markdown-previewer',
  'dotfiles',
]);

function ProjectList({ projects }: { projects: typeof portfolio.projects }) {
  return (
    <div className="page-list">
      {projects.map((project) => (
        <article className="list-item" key={project.id}>
          <p className="mono-label">{project.category} · {project.technologies.join(' / ')}</p>
          <h3><Link className="text-link" href={`/projects/${generateSlug(project.title)}/`}>{project.title}</Link></h3>
          <p>{project.description}</p>
          <div className="link-row">
            <Link className="text-link" href={`/projects/${generateSlug(project.title)}/`}>Details</Link>
            {project.github && <a className="text-link" href={project.github} rel="noreferrer" target="_blank">Source ↗</a>}
            {project.demo && <a className="text-link" href={project.demo}>Open app ↗</a>}
          </div>
        </article>
      ))}
    </div>
  );
}

export default function ProjectsPage() {
  const curated = portfolio.projects.filter(({ title }) => selected.has(generateSlug(title)));
  const archive = portfolio.projects.filter(({ title }) => !selected.has(generateSlug(title)));

  return (
    <SiteLayout title="Projects" description="Selected open-source tools, projects, and coursework archive.">
      <div className="page-content">
        <p className="eyebrow">TOOLS & PROJECTS</p>
        <h1>Useful things, built and maintained.</h1>
        <p className="page-intro">Selected tools and projects, with links to their source or working demo.</p>
        <h2>Selected projects</h2>
        <ProjectList projects={curated} />
        <details className="archive">
          <summary>Earlier projects and coursework ({archive.length})</summary>
          <ProjectList projects={archive} />
        </details>
      </div>
    </SiteLayout>
  );
}
