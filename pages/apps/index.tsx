import Link from 'next/link';
import SiteLayout from '../../components/SiteLayout';

export default function AppsPage() {
  return (
    <SiteLayout title="Apps | Lalit Kumar" description="Small browser tools made to solve practical problems.">
      <div className="page-width content-page">
        <p className="eyebrow">Apps</p>
        <h1>Small tools for useful jobs.</h1>
        <p className="page-lede">Browser-based experiments and utilities. The Markdown Previewer reads local files in your browser; it does not upload them.</p>
        <section className="app-listing">
          <div><p className="eyebrow">Markdown Previewer</p><h2>Read and work with Markdown files locally.</h2><p>Browse local files and folders, search documents, preview Mermaid diagrams, and edit tables.</p></div>
          <Link className="button button-primary" href="/apps/markdown-preview/">Open Markdown Previewer</Link>
        </section>
      </div>
    </SiteLayout>
  );
}
