import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import {
  OutcomeIcon,
  ConstructionIcon,
  InfoIcon,
  SlidersIcon,
} from '../../components/icons/AnimatedIcons';
import SiteLayout from '../../components/SiteLayout';
import DirectionalArrow from '../../components/DirectionalArrow';
import {
  caseStudies,
  getCaseStudy,
  type CaseStudy,
} from '../../data/caseStudies';

export default function CaseStudyPage({ study }: { study: CaseStudy }) {
  return (
    <SiteLayout
      title={`${study.title} | Lalit Kumar`}
      description={study.summary}
    >
      <article className="page-width content-page case-detail">
        <Link className="back-link" href="/work/">
          <DirectionalArrow direction="back" /> All selected work
        </Link>
        <p className="eyebrow">
          {study.employer} <span>·</span> {study.period}
        </p>
        <h1>{study.title}</h1>
        <p className="page-lede">{study.summary}</p>
        {study.slug === 'nykaa-cart-reliability' ? (
          <>
            <section className="case-narrative">
              <h2>
                <span className="case-detail-number" aria-hidden="true">
                  01
                </span>
                The challenge
              </h2>
              <p>{study.context}</p>
            </section>
            <section className="case-narrative">
              <h2>
                <span className="case-detail-number" aria-hidden="true">
                  02
                </span>
                What I did and why
              </h2>
              <ul>
                {study.contribution.map((item) => (
                  <li key={`contribution-${item}`}>{item}</li>
                ))}
                {study.decisions.map((item) => (
                  <li key={`decision-${item}`}>{item}</li>
                ))}
              </ul>
            </section>
            <section className="case-narrative">
              <h2>
                <span className="case-detail-number" aria-hidden="true">
                  03
                </span>
                The outcome
              </h2>
              <p>{study.outcome}</p>
            </section>
          </>
        ) : (
          <>
            <section>
              <h2>
                <InfoIcon aria-hidden="true" /> Context
              </h2>
              <p>{study.context}</p>
            </section>
            <section>
              <h2>
                <ConstructionIcon aria-hidden="true" /> Contribution
              </h2>
              <ul>
                {study.contribution.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2>
                <SlidersIcon aria-hidden="true" /> Decisions
              </h2>
              <ul>
                {study.decisions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2>
                <OutcomeIcon aria-hidden="true" /> Outcome
              </h2>
              <p>{study.outcome}</p>
            </section>
          </>
        )}
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
