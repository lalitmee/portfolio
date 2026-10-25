const animationOptions = { duration: 320, easing: 'ease-in-out' };
const animations = [
  [
    '.tilted-arrow .arrow-head',
    [
      'rotate(-45deg) scaleX(1) rotate(45deg)',
      'rotate(-45deg) translateX(20%) scaleX(1.2) rotate(45deg)',
      'rotate(-45deg) scaleX(1) rotate(45deg)',
    ],
  ],
  [
    '.tilted-arrow .arrow-shaft',
    [
      'rotate(-45deg) scaleX(1) rotate(45deg)',
      'rotate(-45deg) scaleX(1.4) rotate(45deg)',
      'rotate(-45deg) scaleX(1) rotate(45deg)',
    ],
  ],
  [
    '.directional-arrow .arrow-head',
    ['scaleX(1)', 'translateX(50%) scaleX(2)', 'scaleX(1)'],
  ],
  [
    '.directional-arrow .arrow-shaft',
    ['scaleX(1)', 'scaleX(2)', 'scaleX(1)'],
  ],
] as const;

export function animateArrows(element: Element) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  for (const [selector, transforms] of animations) {
    element.querySelectorAll<SVGElement>(selector).forEach((part) =>
      part.animate(
        transforms.map((transform) => ({ transform })),
        animationOptions,
      ),
    );
  }
}
