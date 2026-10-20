import Contact from '../components/Contact';
import SiteLayout from '../components/SiteLayout';

export default function ContactPage() {
  return (
    <SiteLayout
      title="Contact | Lalit Kumar"
      description="Contact Lalit Kumar about engineering roles, product work, consulting, or a useful conversation."
    >
      <Contact />
    </SiteLayout>
  );
}
