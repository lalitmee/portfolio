import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useRef, type ReactNode } from 'react';

export default function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const path = router.asPath.split(/[?#]/, 1)[0];
  const previousPath = useRef(path);

  return (
    <div style={{ overflowX: 'clip' }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={path}
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={
            reducedMotion
              ? { opacity: 1, transition: { duration: 0 } }
              : {
                  opacity: 0,
                  y: -8,
                  transition: { duration: 0.14, ease: 'easeIn' },
                }
          }
          transition={{ duration: reducedMotion ? 0 : 0.24, ease: 'easeOut' }}
          style={{ transformOrigin: '50% 15%' }}
          onAnimationComplete={() => {
            if (previousPath.current !== path) {
              previousPath.current = path;
              document
                .getElementById('main-content')
                ?.focus({ preventScroll: true });
            }
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
