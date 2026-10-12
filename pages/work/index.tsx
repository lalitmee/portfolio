import Link from 'next/link';
import SiteLayout from '../../components/SiteLayout';
import { caseStudies } from '../../data/caseStudies';

export default function WorkPage() {
  return (
    <SiteLayout title="Selected Work | Lalit Kumar" description="Selected product engineering work and case studies.">
      <div className="page-width content-page">
        <p className="eyebrow">Selected work</p>
        <h1>Thoughtful work, grounded in real constraints.</h1>
        <p className="page-lede">A few examples of product and platform work across commerce, measurement, and data-heavy interfaces.</p>
        <div className="case-list">
          {caseStudies.map((study, index) => (
            <Link className="case-row" href={`/work/${study.slug}/`} key={study.slug}>
              <span className="case-index">0{index + 1}</span>
              <div>
                <p className="case-meta">{study.employer} <span>·</span> {study.period}</p>
                <h2>{study.title}</h2>
                <p>{study.summary}</p>
              </div>
              <span className="row-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
