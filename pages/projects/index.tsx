import { SiteLayout } from '../../components/SiteLayout';
import ProjectsBrowser from '../../components/ProjectsBrowser';
import portfolio from '../../data/portfolio.json';
import { generateSlug } from '../../utils/slug';

const selected = new Set([
  'browse-nvim',
  'cobalt2-nvim',
  'codecompanion-spinners-nvim',
  'markdown-previewer',
  'dotfiles',
]);

export default function ProjectsPage() {
  const curated = portfolio.projects.filter(({ title }) =>
    selected.has(generateSlug(title)),
  );
  const archive = portfolio.projects.filter(
    ({ title }) => !selected.has(generateSlug(title)),
  );
  const projects = [...curated, ...archive];

  return (
    <SiteLayout
      title="Projects"
      description="Selected open-source tools, projects, and coursework archive."
    >
      <div className="page-content">
        <p className="eyebrow">TOOLS & PROJECTS</p>
        <h1>Useful things, built and maintained.</h1>
        <p className="page-intro">
          Selected tools and projects, with links to their source or working
          demo.
        </p>
        <ProjectsBrowser projects={projects} />
      </div>
    </SiteLayout>
  );
}
