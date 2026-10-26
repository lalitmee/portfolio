const animationOptions = { duration: 720, easing: 'ease-in-out' };
const animations = [
  [
    '.tilted-arrow .arrow-head',
    [
      'rotate(-45deg) scaleX(1) rotate(45deg)',
      'rotate(-45deg) translateX(50%) scaleX(1.2) rotate(45deg)',
      'rotate(-45deg) scaleX(1) rotate(45deg)',
      'rotate(-45deg) translateX(8%) scaleX(1.05) rotate(45deg)',
      'rotate(-45deg) scaleX(1) rotate(45deg)',
      'rotate(-45deg) translateX(4%) scaleX(1.02) rotate(45deg)',
      'rotate(-45deg) scaleX(1) rotate(45deg)',
      'rotate(-45deg) scaleX(1) rotate(45deg)',
    ],
  ],
  [
    '.tilted-arrow .arrow-shaft',
    [
      'rotate(-45deg) scaleX(1) rotate(45deg)',
      'rotate(-45deg) scaleX(1.8) rotate(45deg)',
      'rotate(-45deg) scaleX(1) rotate(45deg)',
      'rotate(-45deg) scaleX(1.17) rotate(45deg)',
      'rotate(-45deg) scaleX(1) rotate(45deg)',
      'rotate(-45deg) scaleX(1.08) rotate(45deg)',
      'rotate(-45deg) scaleX(1) rotate(45deg)',
      'rotate(-45deg) scaleX(1) rotate(45deg)',
    ],
  ],
  [
    '.directional-arrow .arrow-head',
    [
      'scaleX(1)',
      'translateX(50%) scaleX(2)',
      'scaleX(1)',
      'translateX(8%) scaleX(1.16)',
      'scaleX(1)',
      'translateX(4%) scaleX(1.08)',
      'scaleX(1)',
      'scaleX(1)',
    ],
  ],
  [
    '.directional-arrow .arrow-shaft',
    [
      'scaleX(1)',
      'scaleX(2)',
      'scaleX(1)',
      'scaleX(1.16)',
      'scaleX(1)',
      'scaleX(1.08)',
      'scaleX(1)',
      'scaleX(1)',
    ],
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
