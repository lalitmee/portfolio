import portfolio from '../data/portfolio.json';
import Link from 'next/link';

export default function Footer(): React.ReactElement {
  return (
    <footer className="site-footer">
      <div>
        <strong>{portfolio.personal.name}</strong>
        <p>Senior Software Engineer · Frontend products, analytics, and developer tools</p>
      </div>
      <nav aria-label="Footer navigation">
        <Link href="/privacy/">Privacy</Link>
        <a href="/Lalit_Kumar_Resume.pdf">Résumé</a>
        <a href={`mailto:${portfolio.contact.email}`}>Email</a>
      </nav>
      <small>© {new Date().getFullYear()} Lalit Kumar</small>
    </footer>
  );
}
