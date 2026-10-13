import portfolio from '../data/portfolio.json';

export type ProjectRecord = (typeof portfolio.projects)[number];

export function filterProjects(
  projects: ProjectRecord[],
  query: string,
): ProjectRecord[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return projects;

  return projects.filter(({ title, description, technologies }) =>
    [title, description, ...technologies].some((value) =>
      value.toLowerCase().includes(normalizedQuery),
    ),
  );
}
