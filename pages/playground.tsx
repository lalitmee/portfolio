import SiteLayout from '../components/SiteLayout';
import InteractivePlayground from '../components/InteractivePlayground';
import { useRouter } from 'next/router';

export default function PlaygroundPage() {
  const router = useRouter();

  function exitPlayground() {
    if (document.fullscreenElement) {
      void document.exitFullscreen?.().catch(() => {});
    }

    if (window.history.length > 1) router.back();
    else void router.push('/');
  }

  return (
    <SiteLayout
      title="Playground | Lalit Kumar"
      description="Interactive physics and particle simulations exploring kinetic motion, spring connections, and dynamic force fields."
    >
      <div className="page-width content-page playground-immersive">
        <h1 className="sr-only">Interactive Physics Sandbox</h1>
        <InteractivePlayground onExit={exitPlayground} />
      </div>
    </SiteLayout>
  );
}
