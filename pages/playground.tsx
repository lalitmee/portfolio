import SiteLayout from '../components/SiteLayout';
import InteractivePlayground from '../components/InteractivePlayground';

export default function PlaygroundPage() {
  return (
    <SiteLayout
      title="Playground | Lalit Kumar"
      description="Interactive physics and particle simulations exploring kinetic motion, spring connections, and dynamic force fields."
    >
      <div className="page-width content-page">
        <p className="eyebrow">Lab · Experiments</p>
        <h1>Interactive Physics Sandbox</h1>
        <p className="page-lede">
          A kinetic particle simulation experimenting with spring dynamics, gravitational
          fields, and wave impulses. Move your cursor to repel or attract nodes, change modes,
          or pulse shockwaves.
        </p>

        <InteractivePlayground />
      </div>
    </SiteLayout>
  );
}
