import Link from 'next/link';
import Image from 'next/image';
import { MdArrowOutward } from 'react-icons/md';
import SiteLayout from '../../components/SiteLayout';
import { trackEvent } from '../../utils/analytics';

export default function AppsPage() {
  return (
    <SiteLayout
      title="Apps | Lalit Kumar"
      description="Small browser tools made to solve practical problems."
    >
      <div className="page-width content-page">
        <p className="eyebrow">Apps</p>
        <h1>Small tools for useful jobs.</h1>
        <p className="page-lede">
          Browser-based tools that keep your files and data in your browser.
        </p>
        <Link
          className="app-listing"
          href="/apps/markdown-preview/"
          aria-label="Open Markdown Previewer"
          onClick={() =>
            trackEvent({ event: 'app_launch', app_slug: 'markdown-preview' })
          }
        >
          <div className="app-listing-preview-frame">
            <Image
              className="app-listing-preview"
              src="/images/apps/markdown-previewer.png"
              alt="Markdown Previewer app screenshot"
              width={2912}
              height={1804}
            />
          </div>
          <div>
            <p className="eyebrow">Markdown Previewer</p>
            <h2>Read and work with Markdown files locally.</h2>
            <p>
              Browse local files and folders, search documents, preview Mermaid
              diagrams, and edit tables.
            </p>
          </div>
          <span className="app-launch" aria-hidden="true">
            <MdArrowOutward className="app-launch-arrow" aria-hidden="true" />
          </span>
        </Link>
        <Link
          className="app-listing"
          href="/apps/json-assistant/"
          aria-label="Open JSON Assistant"
          onClick={() =>
            trackEvent({ event: 'app_launch', app_slug: 'json-assistant' })
          }
        >
          <div className="app-listing-preview-frame">
            <Image
              className="app-listing-preview"
              src="/images/apps/json-assistant.png"
              alt="JSON Assistant app screenshot"
              width={1440}
              height={1000}
            />
          </div>
          <div>
            <p className="eyebrow">JSON Assistant</p>
            <h2>Inspect and edit JSON in the view that fits your work.</h2>
            <p>
              Switch between Code, Tree, and Split views. Your JSON stays in
              your browser; it is not uploaded.
            </p>
          </div>
          <span className="app-launch" aria-hidden="true">
            <MdArrowOutward className="app-launch-arrow" aria-hidden="true" />
          </span>
        </Link>
      </div>
    </SiteLayout>
  );
}
