import Link from 'next/link';

const links = [
  ['Work', '/work/'],
  ['Projects', '/projects/'],
  ['Apps', '/apps/'],
  ['About', '/about/'],
  ['Contact', '/contact/'],
  ['Privacy', '/privacy/'],
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link className="site-brand" href="/">
          Lalit Kumar<span aria-hidden="true">.</span>
        </Link>
        <p>Product engineering, independent tools, and open-source work.</p>
        <nav aria-label="Footer navigation">
          {links.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <small>© {new Date().getFullYear()} Lalit Kumar</small>
      </div>
    </footer>
  );
}
