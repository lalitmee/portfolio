import { flushSync } from 'react-dom';

type OriginEvent = {
  currentTarget: HTMLElement;
  nativeEvent: Event;
};

export function animateAppearanceChange(
  event: OriginEvent,
  update: () => void,
  change: 'accent' | 'theme' = 'accent',
) {
  if (
    !document.startViewTransition ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    update();
    return;
  }

  const pointer = event.nativeEvent as MouseEvent;
  const rect = event.currentTarget.getBoundingClientRect();
  const x = pointer.detail > 0 ? pointer.clientX : rect.left + rect.width / 2;
  const y = pointer.detail > 0 ? pointer.clientY : rect.top + rect.height / 2;
  const radius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  );
  const accent = change === 'accent';
  const duration = accent ? 1100 : 650;
  const easing = accent ? 'ease-in-out' : 'cubic-bezier(.22,1,.36,1)';
  document.documentElement.dataset.appearanceTransition = 'iris';
  const edge = accent ? document.createElement('span') : null;
  if (edge) {
    edge.className = 'appearance-iris-edge';
    edge.style.left = `${x - radius}px`;
    edge.style.top = `${y - radius}px`;
    edge.style.width = `${radius * 2}px`;
    edge.style.height = `${radius * 2}px`;
    edge.style.borderWidth = '6px';
  }
  const transition = document.startViewTransition(() => {
    flushSync(update);
    // Capture the edge in the new palette, outside the root's reveal clip.
    if (edge) document.body.append(edge);
  });
  void transition.ready
    .then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing,
          pseudoElement: '::view-transition-new(root)',
          fill: 'both',
        },
      );
      if (edge) {
        document.documentElement.animate(
          [
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(0.75)', opacity: 1, offset: 0.75 },
            { transform: 'scale(1)', opacity: 0 },
          ],
          {
            duration,
            easing,
            pseudoElement: '::view-transition-new(appearance-iris-edge)',
            fill: 'both',
          },
        );
      }
    })
    .catch(() => {});
  void transition.finished
    .finally(() => {
      edge?.remove();
      delete document.documentElement.dataset.appearanceTransition;
    })
    .catch(() => {});
}
