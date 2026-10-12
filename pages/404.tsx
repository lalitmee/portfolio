import Link from 'next/link';
import SiteLayout from '../components/SiteLayout';

export default function NotFoundPage() {
  return <SiteLayout title="Page not found | Lalit Kumar" description="This page could not be found."><div className="page-width content-page"><p className="eyebrow">404</p><h1>This page isn’t here.</h1><p className="page-lede">The link may be old or the address may have a typo.</p><Link className="text-link" href="/">Return home →</Link></div></SiteLayout>;
}
