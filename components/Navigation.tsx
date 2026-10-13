import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MdClose, MdMenu } from 'react-icons/md';
import ThemeToggle from './ThemeToggle';

const links = [
  { href: '/', label: 'Home' },
  { href: '/work/', label: 'Work' },
  { href: '/projects/', label: 'Projects' },
  { href: '/apps/', label: 'Apps' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
];

export default function Navigation() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const pathname = router.asPath.split(/[?#]/, 1)[0] || '/';

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  useEffect(() => setMenuOpen(false), [router.asPath]);

  const isCurrent = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="site-header">
      <div className="site-nav">
        <Link
          className="site-brand"
          href="/"
          aria-label="LK., Lalit Kumar home"
        >
          LK<span aria-hidden="true">.</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isCurrent(link.href) ? 'page' : undefined}
            >
              <span>{link.label}</span>
              {isCurrent(link.href) && (
                <motion.span
                  className="desktop-nav-indicator"
                  layoutId="desktop-nav-indicator"
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.28,
                    ease: 'easeInOut',
                  }}
                  aria-hidden="true"
                />
              )}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <button
            ref={menuButton}
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={
              menuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <MdClose aria-hidden="true" />
            ) : (
              <MdMenu aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      <motion.nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        initial={false}
        animate={menuOpen ? 'open' : 'closed'}
        variants={{
          open: { height: 'auto', opacity: 1, y: 0 },
          closed: { height: 0, opacity: 0, y: shouldReduceMotion ? 0 : -8 },
        }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.18,
          ease: 'easeOut',
        }}
      >
        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.div className="mobile-nav-links" key="mobile-nav-links">
              {links.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -4 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.12,
                    delay: shouldReduceMotion ? 0 : index * 0.025,
                  }}
                >
                  <Link
                    href={link.href}
                    aria-current={isCurrent(link.href) ? 'page' : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
