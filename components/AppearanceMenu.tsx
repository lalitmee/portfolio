import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MdCheck, MdPalette } from 'react-icons/md';
import { accents } from '../utils/appearance';
import { animateAppearanceChange } from '../utils/appearance-motion';

export default function AppearanceMenu() {
  const id = useId();
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const pointerOrigin = useRef<MouseEvent | null>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('blue');
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const sync = () =>
      setSelected(document.documentElement.dataset.accent || 'blue');
    sync();
    window.addEventListener('accent-change', sync);
    return () => window.removeEventListener('accent-change', sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    container.current
      ?.querySelector<HTMLInputElement>('input:checked')
      ?.focus();
    const dismiss = (event: MouseEvent) => {
      if (!container.current?.contains(event.target as Node)) {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener('click', dismiss);
    return () => document.removeEventListener('click', dismiss);
  }, [open]);

  return (
    <div
      ref={container}
      className="appearance-menu"
      onBlur={(event) => {
        if (
          event.relatedTarget &&
          !event.currentTarget.contains(event.relatedTarget)
        )
          setOpen(false);
      }}
      onKeyDown={(event) => {
        pointerOrigin.current = null;
        if (open && event.key === 'Escape') {
          event.preventDefault();
          event.stopPropagation();
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <button
        ref={trigger}
        className="theme-toggle appearance-toggle"
        type="button"
        aria-label="Appearance"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
      >
        <MdPalette aria-hidden="true" />
      </button>
      <div inert={!open} aria-hidden={!open}>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="appearance-panel"
              className="appearance-panel"
              id={id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -6 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.15,
                ease: 'easeOut',
              }}
            >
              <p className="appearance-heading">Appearance</p>
              <fieldset>
                <legend>Accent color</legend>
                {accents.map((accent) => (
                  <label
                    key={accent.id}
                    onClickCapture={(event) => {
                      if (event.detail > 0)
                        pointerOrigin.current = event.nativeEvent;
                    }}
                  >
                    <input
                      type="radio"
                      name={id}
                      value={accent.id}
                      checked={selected === accent.id}
                      onChange={(event) => {
                        const origin = {
                          currentTarget: event.currentTarget,
                          nativeEvent:
                            pointerOrigin.current || event.nativeEvent,
                        };
                        pointerOrigin.current = null;
                        animateAppearanceChange(origin, () => {
                          const root = document.documentElement;
                          root.dataset.accent = accent.id;
                          root.style.setProperty(
                            '--accent-light',
                            accent.light,
                          );
                          root.style.setProperty('--accent-dark', accent.dark);
                          try {
                            localStorage.setItem('accent', accent.id);
                          } catch {}
                          window.dispatchEvent(new Event('accent-change'));
                          setOpen(false);
                          trigger.current?.focus();
                        });
                      }}
                    />
                    <span
                      className="accent-swatch"
                      style={{ background: accent.light }}
                      aria-hidden="true"
                    />
                    <span>{accent.name}</span>
                    {selected === accent.id && <MdCheck aria-hidden="true" />}
                  </label>
                ))}
              </fieldset>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
