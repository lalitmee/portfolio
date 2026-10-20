import Link from 'next/link';
import { MdArrowOutward } from 'react-icons/md';
import SiteLayout from '../../components/SiteLayout';
import portfolioData from '../../data/portfolio.json';
import { trackEvent } from '../../utils/analytics';
import { generateSlug } from '../../utils/slug';

const curated = [
  'browse.nvim',
  'markdown-previewer',
  'codecompanion-spinners.nvim',
  'cobalt2.nvim',
  'dotfiles',
];
const featuredProjects = portfolioData.projects.filter((project) =>
  curated.includes(project.title),
);
const archiveProjects = portfolioData.projects.filter(
  (project) => !curated.includes(project.title),
);

function ProjectLink({
  project,
}: {
  project: (typeof portfolioData.projects)[number];
}) {
  return (
    <Link
      className="project-link"
      href={`/projects/${generateSlug(project.title)}/`}
      onClick={() =>
        trackEvent({
          event: 'project_open',
          project_slug: generateSlug(project.title),
          destination_kind: 'detail',
        })
      }
    >
      <span>{project.category}</span>
      <strong>{project.title}</strong>
      <MdArrowOutward className="row-arrow" aria-hidden="true" />
    </Link>
  );
}

export default function ProjectsPage() {
  return (
    <SiteLayout
      title="Projects | Lalit Kumar"
      description="Independent tools, open-source work, and an archive of earlier projects."
    >
      <div className="page-width content-page">
        <p className="eyebrow">Projects & experiments</p>
        <h1>Useful things, made for real workflows.</h1>
        <p className="page-lede">
          A selection of open-source tools and personal projects. Older learning
          projects remain available in the archive.
        </p>
        <section>
          <h2>Selected</h2>
          <div className="project-list">
            {featuredProjects.map((project) => (
              <ProjectLink project={project} key={project.id} />
            ))}
          </div>
        </section>
        <details className="project-archive">
          <summary>
            Earlier projects and learning work ({archiveProjects.length})
          </summary>
          <div className="project-list">
            {archiveProjects.map((project) => (
              <ProjectLink project={project} key={project.id} />
            ))}
          </div>
        </details>
      </div>
    </SiteLayout>
  );
}
