import Link from 'next/link';
import { SiteLayout } from '../components/SiteLayout';

export default function NotFoundPage() {
  return (
    <SiteLayout title="Page not found" description="The requested page could not be found.">
      <div className="page-content">
        <p className="eyebrow">404 · NOT FOUND</p>
        <h1>This page isn’t here.</h1>
        <p className="page-intro">The link may be out of date, or the address may be mistyped.</p>
        <p><Link className="text-link" href="/">Return home →</Link> · <Link className="text-link" href="/work/">Browse selected work</Link></p>
      </div>
    </SiteLayout>
  );
}
