import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import ArrowIcon from '../../components/ArrowIcon';
import { SiteLayout } from '../../components/SiteLayout';
import portfolio from '../../data/portfolio.json';
import { trackEvent } from '../../utils/analytics';
import { generateSlug } from '../../utils/slug';

type Project = (typeof portfolio.projects)[number];

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <SiteLayout title={project.title} description={project.description}>
      <article className="page-content">
        <Link className="text-link" href="/projects/">All projects <ArrowIcon /></Link>
        <p className="eyebrow">{project.category} · {project.technologies.join(' / ')}</p>
        <h1>{project.title}</h1>
        <p className="page-intro">{project.description}</p>
        <section className="content-section">
          <h2>Project details</h2>
          <p>{project.github ? 'This project has a public source repository.' : 'This project is available as a hosted tool.'}</p>
          <ul className="tool-list">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
        </section>
        <div className="link-row">
          {project.github && <a className="button button-secondary" href={project.github} onClick={() => trackEvent({ event: 'project_open', project_slug: generateSlug(project.title), destination_kind: 'source' })} rel="noreferrer" target="_blank">View source ↗</a>}
          {project.demo && <a className="button button-primary" href={project.demo} onClick={() => trackEvent({ event: 'project_open', project_slug: generateSlug(project.title), destination_kind: 'demo' })}>Open demo ↗</a>}
        </div>
      </article>
    </SiteLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: portfolio.projects.map((project) => ({
    params: { slug: generateSlug(project.title) },
  })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<{ project: Project }> = async ({ params }) => {
  const project = portfolio.projects.find(
    (candidate) => generateSlug(candidate.title) === params?.slug,
  );
  return project ? { props: { project } } : { notFound: true };
};
