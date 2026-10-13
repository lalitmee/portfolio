import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { SiteLayout } from '../../components/SiteLayout';
import { caseStudies } from '../../data/caseStudies';
import type { CaseStudy } from '../../data/caseStudies';

export default function CaseStudyPage({ study }: { study: CaseStudy }) {
  const sections = [
    ['context', 'Context'],
    ['contribution', 'Contribution'],
    ['decisions', 'Decisions'],
    ['outcome', 'Outcome'],
  ];

  return (
    <SiteLayout title={study.title} description={study.summary}>
      <article className="page-content case-page">
        <Link className="text-link" href="/work/">← All work</Link>
        <p className="eyebrow">{study.employer} · {study.period}</p>
        <h1>{study.title}</h1>
        <p className="page-intro">{study.summary}</p>
        <nav aria-label="On this page" className="case-contents">
          {sections.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}
        </nav>
        <section className="case-section" id="context">
          <h2>Context</h2>
          <p>{study.context}</p>
        </section>
        <section className="case-section" id="contribution">
          <h2>Contribution</h2>
          <ul>{study.contribution.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section className="case-section" id="decisions">
          <h2>Decisions and trade-offs</h2>
          <ul>{study.decisions.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section className="case-section" id="outcome">
          <h2>Outcome</h2>
          <p>{study.outcome}</p>
        </section>
      </article>
    </SiteLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: caseStudies.map(({ slug }) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<{ study: CaseStudy }> = async ({ params }) => {
  const study = caseStudies.find(({ slug }) => slug === params?.slug);
  return study ? { props: { study } } : { notFound: true };
};
