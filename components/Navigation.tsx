import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MdClose, MdMenu } from 'react-icons/md';
import ThemeToggle from './ThemeToggle';
import AppearanceMenu from './AppearanceMenu';

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
  const mobileDialog = useRef<HTMLDialogElement>(null);
  const restoreMenuFocus = useRef(true);
  const shouldReduceMotion = useReducedMotion();
  const pathname = router.asPath.split(/[?#]/, 1)[0] || '/';

  useEffect(() => {
    if (mobileDialog.current?.open) restoreMenuFocus.current = false;
    setMenuOpen(false);
  }, [router.asPath]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 761px)');
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };

    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  useEffect(() => {
    const dialog = mobileDialog.current;
    if (!dialog) return;

    if (menuOpen && !dialog.open) {
      restoreMenuFocus.current = true;
      dialog.showModal();
    }
    if (!menuOpen && dialog.open) {
      dialog.close();
      if (
        restoreMenuFocus.current &&
        !window.matchMedia('(min-width: 761px)').matches
      ) {
        menuButton.current?.focus();
      }
      restoreMenuFocus.current = true;
    }
  }, [menuOpen]);

  const closeMobileMenu = () => {
    setMenuOpen(false);
  };

  const isCurrent = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <motion.header className="site-header" layoutRoot>
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
          <AppearanceMenu />
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
            <span className="menu-toggle-icon">
              {menuOpen ? (
                <MdClose aria-hidden="true" />
              ) : (
                <MdMenu aria-hidden="true" />
              )}
            </span>
          </button>
        </div>
      </div>
      <dialog
        ref={mobileDialog}
        id="mobile-navigation"
        className="mobile-menu-dialog"
        aria-label="Mobile navigation"
        onCancel={(event) => {
          event.preventDefault();
          closeMobileMenu();
        }}
        onClose={() => {
          if (menuOpen) closeMobileMenu();
        }}
        onClick={(event) => {
          if (event.target === mobileDialog.current) closeMobileMenu();
        }}
      >
        <div className="mobile-menu-topbar">
          <Link
            className="site-brand"
            href="/"
            aria-label="LK., Lalit Kumar home"
          >
            LK<span aria-hidden="true">.</span>
          </Link>
          <div className="nav-actions">
            <AppearanceMenu />
            <ThemeToggle />
            <button
              className="menu-toggle"
              type="button"
              aria-label="Close navigation menu"
              onClick={closeMobileMenu}
            >
              <MdClose aria-hidden="true" />
            </button>
          </div>
        </div>
        <nav className="mobile-nav" aria-label="Mobile navigation links">
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
        </nav>
      </dialog>
    </motion.header>
  );
}
