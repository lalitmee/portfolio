import Link from 'next/link';
import SiteLayout from '../components/SiteLayout';

export default function NotFoundPage() {
  return (
    <SiteLayout title="Page not found" description="The page you requested could not be found.">
      <div className="page-content not-found">
        <p className="eyebrow">404</p>
        <h1 className="route-title">This page isn’t here.</h1>
        <p className="route-intro">The link may be old, or the address may have a typo.</p>
        <Link className="button button-primary" href="/">Back to home</Link>
      </div>
    </SiteLayout>
  );
}
