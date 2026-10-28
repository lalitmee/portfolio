import { useEffect, useRef } from 'react';

export default function AmbientGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!isFinePointer.matches) return;

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          if (glowRef.current) {
            glowRef.current.style.setProperty('--cursor-x', `${targetX}px`);
            glowRef.current.style.setProperty('--cursor-y', `${targetY}px`);
            glowRef.current.style.opacity = '1';
          }
          rafId = null;
        });
      }
    };

    const onPointerLeave = () => {
      if (glowRef.current) {
        glowRef.current.style.opacity = '0';
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={glowRef} className="ambient-glow" aria-hidden="true" />;
}
