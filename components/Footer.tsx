import Link from 'next/link';
import portfolioData from '../data/portfolio.json';

export default function Footer() {
  return (
    <footer className="site-footer">
      <span>
        © {new Date().getFullYear()} {portfolioData.personal.name}
      </span>
      <Link href="/privacy">Privacy</Link>
    </footer>
  );
}
