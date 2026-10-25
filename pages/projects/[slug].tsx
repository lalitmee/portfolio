import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { CodeIcon, BulbIcon } from '../../components/icons/AnimatedIcons';
import SiteLayout from '../../components/SiteLayout';
import DirectionalArrow from '../../components/DirectionalArrow';
import TiltedArrow from '../../components/TiltedArrow';
import portfolioData from '../../data/portfolio.json';
import { trackEvent } from '../../utils/analytics';
import { generateSlug } from '../../utils/slug';

type Project = (typeof portfolioData.projects)[number];

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <SiteLayout
      title={`${project.title} | Projects | Lalit Kumar`}
      description={project.description}
    >
      <article className="page-width content-page case-detail">
        <Link className="text-link" href="/projects/">
          <DirectionalArrow direction="back" /> All projects
        </Link>
        <p className="eyebrow">
          {project.category} <span>·</span> {project.status}
        </p>
        <h1>{project.title}</h1>
        <p className="page-lede">{project.description}</p>
        {project.highlights.length > 0 && (
          <section>
            <h2>
              <BulbIcon aria-hidden="true" /> What it does
            </h2>
            <ul>
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}
        {project.technologies.length > 0 && (
          <section>
            <h2>
              <CodeIcon aria-hidden="true" /> Technologies
            </h2>
            <p>{project.technologies.join(' · ')}</p>
          </section>
        )}
        <nav className="detail-actions" aria-label="Project links">
          {project.github && (
            <a
              className="button button-outline section-button"
              href={project.github}
              onPointerEnter={(event) => {
                const bounds = event.currentTarget.getBoundingClientRect();
                event.currentTarget.style.setProperty('--reveal-x', `${event.clientX - bounds.left + 1}px`);
                event.currentTarget.style.setProperty('--reveal-y', `${event.clientY - bounds.top + 1}px`);
              }}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackEvent({
                  event: 'project_open',
                  project_slug: generateSlug(project.title),
                  destination_kind: 'source',
                })
              }
            >
              View source on GitHub <TiltedArrow className="button-arrow" />
              <span className="section-button-fill" aria-hidden="true">
                View source on GitHub <TiltedArrow className="button-arrow" />
              </span>
            </a>
          )}
          {project.demo && (
            <a
              className="button button-primary"
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackEvent({
                  event: 'project_open',
                  project_slug: generateSlug(project.title),
                  destination_kind: 'demo',
                })
              }
            >
              Open project <TiltedArrow className="button-arrow" />
            </a>
          )}
        </nav>
      </article>
    </SiteLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: portfolioData.projects.map((project) => ({
    params: { slug: generateSlug(project.title) },
  })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const project = portfolioData.projects.find(
    (item) => generateSlug(item.title) === params?.slug,
  );
  return project ? { props: { project } } : { notFound: true };
};
