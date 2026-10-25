import Link from 'next/link';
import { useRouter } from 'next/router';

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

  return (
    <footer className="site-footer">
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
    </footer>
  );
}
