import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';

const routes = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/projects', label: 'Projects' },
  { href: '/apps', label: 'Apps' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation({
  showBackArrow = false,
}: {
  showBackArrow?: boolean;
}) {
  const { asPath } = useRouter();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const currentPath = asPath.split(/[?#]/, 1)[0].replace(/\/$/, '') || '/';

  useEffect(() => setOpen(false), [asPath]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape' && open) {
      setOpen(false);
      menuButton.current?.focus();
    }
  };

  return (
    <aside className="site-rail" onKeyDown={handleKeyDown}>
      <div className="rail-top">
        {showBackArrow && (
          <Link className="text-link" href="/projects">
            ← Projects
          </Link>
        )}
        <Link className="wordmark" href="/" aria-label="Lalit Kumar home">
          LK<span aria-hidden="true">.</span>
        </Link>
        <button
          aria-controls="site-navigation"
          aria-expanded={open}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          ref={menuButton}
          type="button"
        >
          <span aria-hidden="true">{open ? '×' : '☰'}</span>
        </button>
      </div>
      <nav
        aria-label="Primary navigation"
        className="route-links"
        data-open={open}
        id="site-navigation"
      >
        {routes.map(({ href, label }) => {
          const route = href.replace(/\/$/, '') || '/';
          const active =
            currentPath === route ||
            (route !== '/' && currentPath.startsWith(`${route}/`));
          return (
            <Link
              aria-current={active ? 'page' : undefined}
              className="route-link"
              href={href}
              key={href}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="rail-bottom">
        <span className="rail-label">INTERFACE / ENGINEERING</span>
        <ThemeToggle />
      </div>
    </aside>
  );
}
