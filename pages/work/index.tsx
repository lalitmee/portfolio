import Link from 'next/link';
import SiteLayout from '../../components/SiteLayout';
import { caseStudies } from '../../data/caseStudies';

export default function WorkPage() {
  return (
    <SiteLayout title="Selected work" description="Case studies from product and analytics engineering work.">
      <div className="page-content">
        <p className="eyebrow">Selected work</p>
        <h1 className="route-title">Product work, with the details intact.</h1>
        <p className="route-intro">A few projects from product interfaces, commerce, analytics, and data tools.</p>
        <div className="case-list">
          {caseStudies.map((study) => (
            <Link className="case-row" href={`/work/${study.slug}/`} key={study.slug}>
              <span className="case-index">↗</span>
              <span><strong>{study.title}</strong><small>{study.employer} · {study.period}</small></span>
              <span className="case-arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
