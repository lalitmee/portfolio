import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import SiteLayout from '../../components/SiteLayout';
import portfolioData from '../../data/portfolio.json';
import { generateSlug } from '../../utils/slug';
import { trackEvent } from '../../utils/analytics';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  image: string;
  github?: string;
  demo?: string;
  highlights: string[];
  status: string;
  featured?: boolean;
  stars?: number;
  forks?: number;
}

interface ProjectDetailProps {
  project: Project;
}

const ProjectDetail = ({ project }: ProjectDetailProps) => {
  return (
    <SiteLayout title={project.title} description={project.description}>
      <article className="page-content case-detail">
        <p className="eyebrow">{project.category}</p>
        <h1 className="route-title">{project.title}</h1>
        <p className="route-intro">{project.description}</p>
        <section>
          <h2>Highlights</h2>
          <ul>
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Technologies</h2>
          <p>{project.technologies.join(' · ')}</p>
        </section>
        <div className="link-row">
          {project.github && (
            <a
              href={project.github}
              onClick={() =>
                trackEvent({
                  event: 'project_open',
                  project_slug: generateSlug(project.title),
                  destination_kind: 'source',
                })
              }
            >
              Source on GitHub ↗
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              onClick={() =>
                trackEvent({
                  event: 'project_open',
                  project_slug: generateSlug(project.title),
                  destination_kind: 'demo',
                })
              }
            >
              Open project ↗
            </a>
          )}
        </div>
        <p>
          <Link href="/projects/">← All projects</Link>
        </p>
      </article>
    </SiteLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = portfolioData.projects.map((project) => ({
    params: { slug: generateSlug(project.title) },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const project = portfolioData.projects.find(
    (p) => generateSlug(p.title) === slug,
  );

  if (!project) {
    return { notFound: true };
  }

  return {
    props: {
      project,
    },
  };
};

export default ProjectDetail;
