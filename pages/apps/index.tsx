import Link from 'next/link';
import Image from 'next/image';
import { MdArrowOutward } from 'react-icons/md';
import SiteLayout from '../../components/SiteLayout';
import DirectionalArrow from '../../components/DirectionalArrow';
import { apps } from '../../data/apps';
import { trackEvent } from '../../utils/analytics';

export default function AppsPage() {
  return (
    <SiteLayout
      title="Apps | Lalit Kumar"
      description="Independent browser apps, and the stories behind them."
    >
      <div className="page-width content-page">
        <p className="eyebrow">Apps</p>
        <h1>Small tools for useful jobs.</h1>
        <p className="page-lede">
          Independent browser apps, shaped by everyday use. Explore the thinking
          behind each one, or open it and try it.
        </p>
        {apps.map((app) => (
          <article className="app-listing" key={app.slug}>
            <div className="app-listing-preview-frame">
              <Image
                className="app-listing-preview"
                src={app.screenshot.src}
                alt={app.screenshot.alt}
                width={app.screenshot.width}
                height={app.screenshot.height}
                sizes="(max-width: 760px) 80vw, 40vw"
              />
            </div>
            <div>
              <p className="eyebrow">Actively evolving</p>
              <h2>{app.name}</h2>
              <p>{app.description}</p>
              <div className="app-actions">
                <Link
                  className="text-link"
                  href={`/apps/${app.slug}/`}
                  aria-label={`Read the story of ${app.name}`}
                >
                  Read the story <DirectionalArrow direction="forward" />
                </Link>
                <a
                  className="text-link"
                  href={app.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${app.name} in a new tab`}
                  onClick={() =>
                    trackEvent({ event: 'app_launch', app_slug: app.slug })
                  }
                >
                  Open app{' '}
                  <MdArrowOutward
                    className="app-launch-arrow"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SiteLayout>
  );
}
