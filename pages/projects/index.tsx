import Link from 'next/link';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
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
  const [archiveOpen, setArchiveOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
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
        <div className="project-archive" data-open={archiveOpen}>
          <button
            className="archive-trigger"
            type="button"
            id="project-archive-trigger"
            aria-expanded={archiveOpen}
            aria-controls="project-archive-content"
            onClick={() => setArchiveOpen((open) => !open)}
          >
            <span className="archive-intro">
              <span className="eyebrow">The archive</span>
              <span className="archive-title">Earlier explorations</span>
              <span className="archive-description">
                Small experiments, first builds, and lessons along the way.
              </span>
            </span>
            <span className="archive-controls">
              <span className="archive-count">
                {archiveProjects.length} projects
              </span>
              <span className="archive-toggle" aria-hidden="true" />
            </span>
          </button>
          <motion.div
            id="project-archive-content"
            role="region"
            aria-labelledby="project-archive-trigger"
            aria-hidden={!archiveOpen}
            inert={!archiveOpen}
            initial={false}
            animate={{
              height: archiveOpen ? 'auto' : 0,
              opacity: archiveOpen ? 1 : 0,
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.28,
              ease: 'easeInOut',
            }}
            style={{ overflow: 'hidden' }}
          >
            <div className="archive-content">
              <div className="project-list">
                {archiveProjects.map((project) => (
                  <ProjectLink project={project} key={project.id} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SiteLayout>
  );
}
