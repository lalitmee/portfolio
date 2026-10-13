import Link from 'next/link';
import ArrowIcon from '../../components/ArrowIcon';
import { SiteLayout } from '../../components/SiteLayout';
import { caseStudies } from '../../data/caseStudies';

export default function WorkPage() {
  return (
    <SiteLayout
      title="Work"
      description="Selected product engineering case studies."
    >
      <div className="page-content">
        <p className="eyebrow">SELECTED WORK</p>
        <h1>Work shaped by real product constraints.</h1>
        <p className="page-intro">
          A few examples of product reliability, measurement, and complex data
          interfaces.
        </p>
        <div className="page-list">
          {caseStudies.map((study) => (
            <article className="list-item interactive-card" key={study.slug}>
              <p className="mono-label">
                {study.employer} · {study.period}
              </p>
              <h2>
                <Link className="text-link" href={`/work/${study.slug}/`}>
                  {study.title}
                </Link>
              </h2>
              <p>{study.summary}</p>
              <Link className="text-link" href={`/work/${study.slug}/`}>
                Read case study <ArrowIcon />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
