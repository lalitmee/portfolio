import HomePage from '../components/HomePage';
import { SiteLayout } from '../components/SiteLayout';

export default function Home() {
  return (
    <SiteLayout
      title="Reliable products and clear engineering"
      description="Lalit Kumar is a senior software engineer working on product reliability, measurement systems, and developer tools."
    >
      <HomePage />
    </SiteLayout>
  );
}
