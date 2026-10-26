import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const links = [
  ['Work', '/work/'],
  ['Projects', '/projects/'],
  ['Apps', '/apps/'],
  ['About', '/about/'],
  ['Contact', '/contact/'],
];

export default function Footer() {
  const { asPath } = useRouter();
  const pathname = asPath.split(/[?#]/, 1)[0].replace(/\/?$/, '/');
  const footerRef = useRef<HTMLElement>(null);
  const [playgroundVisible, setPlaygroundVisible] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const observer = new IntersectionObserver(([entry]) =>
      setPlaygroundVisible(entry.isIntersecting),
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="site-footer" ref={footerRef}>
      <div className="footer-inner">
        <Link className="site-brand" href="/">
          Lalit Kumar<span aria-hidden="true">.</span>
        </Link>
        <p>Product engineering, independent tools, and open-source work.</p>
        <nav aria-label="Footer navigation">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname.startsWith(href) ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="footer-meta">
          <small>© {new Date().getFullYear()} Lalit Kumar</small>
          <Link href="/privacy/">Privacy</Link>
        </div>
      </div>
      <Link
        className={`playground-easter-egg${playgroundVisible ? ' is-visible' : ''}`}
        href="/playground/"
        onClick={(event) => {
          if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
          ) {
            return;
          }
          void document.documentElement.requestFullscreen?.().catch(() => {});
        }}
        aria-label="Open the interactive playground"
        aria-current={pathname.startsWith('/playground/') ? 'page' : undefined}
        aria-hidden={!playgroundVisible}
        tabIndex={playgroundVisible ? 0 : -1}
      >
        <svg
          className="playground-constellation"
          viewBox="0 0 36 28"
          aria-hidden="true"
        >
          <path
            className="playground-constellation-lines"
            d="M5 20 14 6 30 12 22 24 5 20M14 6l8 18"
          />
          <circle
            className="playground-constellation-node"
            cx="5"
            cy="20"
            r="2.5"
          />
          <circle
            className="playground-constellation-node"
            cx="14"
            cy="6"
            r="2.5"
          />
          <circle
            className="playground-constellation-node"
            cx="30"
            cy="12"
            r="2.5"
          />
          <circle
            className="playground-constellation-node"
            cx="22"
            cy="24"
            r="2.5"
          />
        </svg>
        <span className="playground-tab-label" aria-hidden="true">
          PLAY
        </span>
        <span className="playground-tab-full-label" aria-hidden="true">
          Playground
        </span>
      </Link>
    </footer>
  );
}
