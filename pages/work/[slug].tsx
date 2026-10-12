import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import SiteLayout from '../../components/SiteLayout';
import { caseStudies, getCaseStudy, type CaseStudy } from '../../data/caseStudies';

export default function CaseStudyPage({ study }: { study: CaseStudy }) {
  return (
    <SiteLayout title={`${study.title} | Lalit Kumar`} description={study.summary}>
      <article className="page-width content-page case-detail">
        <Link className="text-link" href="/work/">← All selected work</Link>
        <p className="eyebrow">{study.employer} <span>·</span> {study.period}</p>
        <h1>{study.title}</h1>
        <p className="page-lede">{study.summary}</p>
        <section>
          <h2>Context</h2><p>{study.context}</p>
        </section>
        <section>
          <h2>Contribution</h2>
          <ul>{study.contribution.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section>
          <h2>Decisions</h2>
          <ul>{study.decisions.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section>
          <h2>Outcome</h2><p>{study.outcome}</p>
        </section>
      </article>
    </SiteLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: caseStudies.map(({ slug }) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const study = getCaseStudy(String(params?.slug || ''));
  return study ? { props: { study } } : { notFound: true };
};
