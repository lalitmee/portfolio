import type { PointerEvent } from 'react';

export function setUnderlineOrigin(event: PointerEvent<HTMLDivElement>) {
  const link = (event.target as Element).closest<HTMLElement>(
    '.mobile-nav a, .site-footer nav a, .contact-grid aside a',
  );
  if (
    !link ||
    event.pointerType === 'touch' ||
    (event.relatedTarget &&
      'nodeType' in event.relatedTarget &&
      link.contains(event.relatedTarget as Node))
  )
    return;

  const bounds = link.getBoundingClientRect();
  link.style.setProperty(
    '--underline-origin',
    event.clientX < bounds.left + bounds.width / 2 ? 'left' : 'right',
  );
}

export function setTextLinkRevealOrigin(event: PointerEvent<HTMLDivElement>) {
  const link = (event.target as Element).closest<HTMLAnchorElement>(
    'a.text-link',
  );
  if (
    !link ||
    (event.relatedTarget && link.contains(event.relatedTarget as Node))
  )
    return;

  const bounds = link.getBoundingClientRect();
  link.style.setProperty('--reveal-x', `${event.clientX - bounds.left}px`);
  link.style.setProperty('--reveal-y', `${event.clientY - bounds.top}px`);
}
