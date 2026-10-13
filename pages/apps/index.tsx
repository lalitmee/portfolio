import Link from 'next/link';
import SiteLayout from '../../components/SiteLayout';
import { trackEvent } from '../../utils/analytics';

export default function AppsPage() {
  return (
    <SiteLayout title="Apps" description="Small software tools and experiments.">
      <div className="page-content">
        <p className="eyebrow">Apps</p>
        <h1 className="route-title">Tools made for real work.</h1>
        <article className="content-card app-card">
          <p className="eyebrow">Markdown Previewer</p>
          <h2>Read and edit Markdown files locally.</h2>
          <p>A local-first tool for opening Markdown files and folders, with a rendered preview beside the editor.</p>
          <Link className="button button-primary" href="/apps/markdown-preview/" onClick={() => trackEvent({ event: 'app_launch', app_slug: 'markdown-previewer' })}>Open the Markdown Previewer ↗</Link>
          <p className="route-note">The app is maintained separately; its availability and configuration are managed by that project.</p>
        </article>
      </div>
    </SiteLayout>
  );
}
