import HomePage from '../components/HomePage';
import SiteLayout from '../components/SiteLayout';

export default function Home() {
  return (
    <SiteLayout
      title="Serious engineering. Room to explore."
      description="Lalit Kumar is a Senior Software Engineer with 8+ years of experience building product interfaces, analytics integrations, and developer tools."
    >
      <HomePage />
    </SiteLayout>
  );
}
