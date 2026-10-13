import { SiteLayout } from '../../components/SiteLayout';
import { trackEvent } from '../../utils/analytics';

export default function AppsPage() {
  return (
    <SiteLayout title="Apps" description="Small tools available to use.">
      <div className="page-content">
        <p className="eyebrow">APPS</p>
        <h1>Tools you can use.</h1>
        <article className="list-item">
          <p className="mono-label">WRITING TOOL</p>
          <h2>Markdown Previewer</h2>
          <p>Write Markdown and see a rendered preview in the existing hosted app.</p>
          <a className="button button-primary" href="/apps/markdown-preview/" onClick={() => trackEvent({ event: 'app_launch', app_slug: 'markdown-preview' })}>Launch Markdown Previewer ↗</a>
        </article>
      </div>
    </SiteLayout>
  );
}
