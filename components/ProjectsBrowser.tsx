import Link from 'next/link';
import { useMemo, useState } from 'react';
import ArrowIcon from './ArrowIcon';
import { filterProjects } from '../utils/projectSearch';
import type { ProjectRecord } from '../utils/projectSearch';
import { trackEvent } from '../utils/analytics';
import { generateSlug } from '../utils/slug';

export default function ProjectsBrowser({
  projects,
}: {
  projects: ProjectRecord[];
}) {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<number | undefined>(
    projects[0]?.id,
  );
  const matches = useMemo(
    () => filterProjects(projects, query),
    [projects, query],
  );
  const selectedProject =
    matches.find(({ id }) => id === selectedId) ?? matches[0];

  const updateQuery = (nextQuery: string) => {
    const nextMatches = filterProjects(projects, nextQuery);
    setQuery(nextQuery);
    setSelectedId((current) =>
      nextMatches.some(({ id }) => id === current)
        ? current
        : nextMatches[0]?.id,
    );
  };

  return (
    <section aria-label="Project browser" className="project-browser">
      <div className="project-browser-list">
        <label className="project-search-label" htmlFor="project-search">
          Search projects
        </label>
        <input
          className="project-search"
          id="project-search"
          onChange={(event) => updateQuery(event.currentTarget.value)}
          type="search"
          value={query}
        />
        <p aria-live="polite" className="project-result-count">
          {matches.length} {matches.length === 1 ? 'project' : 'projects'} found
        </p>
        {matches.length ? (
          <div className="project-options" aria-label="Matching projects">
            {matches.map((project) => (
              <button
                aria-pressed={project.id === selectedProject?.id}
                className="project-option interactive-card"
                key={project.id}
                onClick={() => setSelectedId(project.id)}
                type="button"
              >
                <span>{project.title}</span>
                {project.id === selectedProject?.id && (
                  <span className="project-selected">Selected</span>
                )}
              </button>
            ))}
          </div>
        ) : (
          <p className="project-empty">
            No projects match this search.{' '}
            <button
              className="text-link project-clear"
              onClick={() => updateQuery('')}
              type="button"
            >
              Clear search
            </button>
          </p>
        )}
      </div>

      {selectedProject && (
        <article
          className="project-detail-card interactive-card"
          aria-labelledby="selected-project-title"
        >
          <p className="mono-label">{selectedProject.category}</p>
          <h2 id="selected-project-title">{selectedProject.title}</h2>
          <p>{selectedProject.description}</p>
          <ul className="tool-list">
            {selectedProject.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
          <div className="link-row project-links">
            <Link
              className="button button-primary"
              href={`/projects/${generateSlug(selectedProject.title)}/`}
              onClick={() =>
                trackEvent({
                  event: 'project_open',
                  project_slug: generateSlug(selectedProject.title),
                  destination_kind: 'detail',
                })
              }
            >
              Project details <ArrowIcon />
            </Link>
            {selectedProject.github && (
              <a
                className="button button-secondary"
                href={selectedProject.github}
                onClick={() =>
                  trackEvent({
                    event: 'project_open',
                    project_slug: generateSlug(selectedProject.title),
                    destination_kind: 'source',
                  })
                }
                rel="noreferrer"
                target="_blank"
              >
                Source <ArrowIcon />
              </a>
            )}
            {selectedProject.demo && (
              <a
                className="button button-secondary"
                href={selectedProject.demo}
                onClick={() =>
                  trackEvent({
                    event: 'project_open',
                    project_slug: generateSlug(selectedProject.title),
                    destination_kind: 'demo',
                  })
                }
              >
                Open demo <ArrowIcon />
              </a>
            )}
          </div>
        </article>
      )}
    </section>
  );
}
