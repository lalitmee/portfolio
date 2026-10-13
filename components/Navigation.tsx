import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';

const links = [
  ['/', 'Home'],
  ['/work/', 'Work'],
  ['/projects/', 'Projects'],
  ['/apps/', 'Apps'],
  ['/about/', 'About'],
  ['/contact/', 'Contact'],
] as const;

export default function Navigation(_props: { showBackArrow?: boolean } = {}): React.ReactElement {
  const { asPath } = useRouter();
  const pathname = asPath.split(/[?#]/)[0];
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    navRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const active = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <header className="site-header">
      <nav className="nav-wrap" aria-label="Main navigation">
        <Link className="wordmark" href="/" aria-label="Lalit Kumar home">LK<span>.</span></Link>
        <div className="desktop-nav">
          {links.map(([href, label]) => (
            <Link key={href} href={href} aria-current={active(href) ? 'page' : undefined}>
              {label}
            </Link>
          ))}
        </div>
        <div className="nav-actions">
          <ThemeToggle />
          <button
            ref={toggleRef}
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
        <div
          id="mobile-navigation"
          ref={navRef}
          className={`mobile-nav${open ? ' is-open' : ''}`}
          hidden={!open}
        >
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={active(href) ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
