import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { CheckIcon, CloseIcon, PaletteIcon } from './icons/AnimatedIcons';
import {
  accents,
  defaultAppearance,
  fonts,
  headingFonts,
} from '../utils/appearance';
import { animateAppearanceChange } from '../utils/appearance-motion';

const serifFontIds = new Set([
  'playfair-display',
  'dm-serif-display',
  'lora',
  'libre-baskerville',
  'cormorant-garamond',
]);

const fontFamily = (id: string) =>
  id === 'system'
    ? 'system-ui, sans-serif'
    : id === 'georgia'
      ? "Georgia, 'Times New Roman', serif"
      : `var(--font-${id}), ${serifFontIds.has(id) ? 'serif' : 'sans-serif'}`;

const appearanceTabs = ['colors', 'heading-font', 'body-font'] as const;

export default function AppearanceMenu() {
  const id = useId();
  const container = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const pointerOrigin = useRef<MouseEvent | null>(null);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] =
    useState<(typeof appearanceTabs)[number]>('colors');
  const [selectedAccent, setSelectedAccent] = useState('blue');
  const [bodyFont, setBodyFont] = useState('outfit');
  const [headingFont, setHeadingFont] = useState('georgia');
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia('(max-width: 760px)');
    const syncViewport = () => setIsMobile(media.matches);
    syncViewport();
    media.addEventListener('change', syncViewport);
    return () => media.removeEventListener('change', syncViewport);
  }, []);

  useEffect(() => {
    const syncAppearance = () => {
      const root = document.documentElement;
      setSelectedAccent(root.dataset.accent || 'blue');
      setBodyFont(root.dataset.bodyFont || 'outfit');
      setHeadingFont(root.dataset.headingFont || 'georgia');
    };
    syncAppearance();
    window.addEventListener('accent-change', syncAppearance);
    window.addEventListener('font-change', syncAppearance);
    return () => {
      window.removeEventListener('accent-change', syncAppearance);
      window.removeEventListener('font-change', syncAppearance);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    panel.current
      ?.querySelector<HTMLButtonElement>('[role="tab"][aria-selected="true"]')
      ?.focus({ preventScroll: true });
    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [open]);

  const close = () => {
    setOpen(false);
  };

  const resetAppearance = (
    event: ReactMouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    animateAppearanceChange(
      { currentTarget: event.currentTarget, nativeEvent: event.nativeEvent },
      () => {
        const accent = accents.find(
          ({ id: accentId }) => accentId === defaultAppearance.accent,
        )!;
        const root = document.documentElement;
        setTheme(defaultAppearance.theme);
        root.dataset.accent = accent.id;
        root.dataset.bodyFont = defaultAppearance.bodyFont;
        root.dataset.headingFont = defaultAppearance.headingFont;
        root.style.setProperty('--accent-light', accent.light);
        root.style.setProperty('--accent-dark', accent.dark);
        try {
          for (const key of [
            'theme',
            'accent',
            'font',
            'body-font',
            'heading-font',
          ]) {
            localStorage.removeItem(key);
          }
        } catch {}
        window.dispatchEvent(new Event('accent-change'));
        window.dispatchEvent(new Event('font-change'));
      },
      'theme',
    );
  };

  const handleTabKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const nextIndex =
      (appearanceTabs.indexOf(activeTab) + direction + appearanceTabs.length) %
      appearanceTabs.length;
    const nextTab = appearanceTabs[nextIndex];
    setActiveTab(nextTab);
    panel.current
      ?.querySelector<HTMLButtonElement>(`[id="${id}-${nextTab}-tab"]`)
      ?.focus();
  };

  const panelInitial = shouldReduceMotion
    ? { opacity: 0 }
    : isMobile
      ? { opacity: 0, y: '100%' }
      : { opacity: 0, y: 16, scale: 0.975 };
  const panelAnimate = shouldReduceMotion
    ? { opacity: 1, transition: { duration: 0 } }
    : {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: 'spring' as const,
          stiffness: isMobile ? 360 : 420,
          damping: isMobile ? 38 : 32,
          mass: isMobile ? 0.9 : 0.75,
        },
      };
  const panelExit = shouldReduceMotion
    ? { opacity: 0, transition: { duration: 0 } }
    : isMobile
      ? {
          opacity: 0,
          y: '100%',
          transition: { duration: 0.24, ease: [0.4, 0, 1, 1] as const },
        }
      : {
          opacity: 0,
          y: 10,
          scale: 0.985,
          transition: { duration: 0.16, ease: [0.4, 0, 1, 1] as const },
        };

  return (
    <div
      ref={container}
      className="appearance-menu"
      onKeyDown={(event) => {
        pointerOrigin.current = null;
        if (event.key === 'Escape' && open) {
          event.preventDefault();
          event.stopPropagation();
          close();
          return;
        }
        if (event.key !== 'Tab' || !open) return;
        const focusable = panel.current?.querySelectorAll<HTMLElement>(
          'button:not(:disabled), [role="tabpanel"]:not([hidden]) input[type="radio"]:checked:not(:disabled)',
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
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
        <PaletteIcon />
      </button>
      {mounted &&
        createPortal(
          <div className="appearance-portal" inert={!open} aria-hidden={!open}>
            <AnimatePresence
              initial={false}
              onExitComplete={() =>
                trigger.current?.focus({ preventScroll: true })
              }
            >
              {open && (
                <motion.div
                  className="appearance-overlay"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: {
                      duration: shouldReduceMotion ? 0 : 0.22,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }}
                  exit={{
                    opacity: 0,
                    transition: {
                      duration: shouldReduceMotion ? 0 : isMobile ? 0.24 : 0.18,
                      ease: [0.4, 0, 1, 1],
                    },
                  }}
                  onMouseDown={(event) => {
                    if (event.target === event.currentTarget) close();
                  }}
                >
                  <motion.div
                    ref={panel}
                    key="appearance-panel"
                    className="appearance-panel"
                    id={id}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={`${id}-title`}
                    style={{ fontFamily: fontFamily(bodyFont) }}
                    initial={panelInitial}
                    animate={panelAnimate}
                    exit={panelExit}
                  >
                    <div className="appearance-panel-header">
                      <h2 className="appearance-heading" id={`${id}-title`}>
                        Appearance
                      </h2>
                      <button
                        className="appearance-close"
                        type="button"
                        aria-label="Close appearance panel"
                        onClick={close}
                      >
                        <CloseIcon />
                      </button>
                    </div>
                    <div
                      className="appearance-tabs"
                      role="tablist"
                      aria-label="Appearance settings"
                    >
                      {appearanceTabs.map((tab) => (
                        <button
                          key={tab}
                          id={`${id}-${tab}-tab`}
                          type="button"
                          role="tab"
                          aria-selected={activeTab === tab}
                          aria-controls={`${id}-${tab}-panel`}
                          onClick={() => setActiveTab(tab)}
                          onKeyDown={handleTabKeyDown}
                        >
                          {activeTab === tab && (
                            <motion.span
                              className="appearance-tab-selection"
                              layoutId={`${id}-tab-selection`}
                              transition={{
                                type: 'spring',
                                stiffness: 500,
                                damping: 38,
                              }}
                            />
                          )}
                          <span className="appearance-tab-label">
                            {tab === 'colors'
                              ? 'Colors'
                              : tab === 'heading-font'
                                ? 'Heading font'
                                : 'Body font'}
                          </span>
                        </button>
                      ))}
                    </div>
                    <div
                      className="appearance-tab-panel appearance-colors-panel"
                      role="tabpanel"
                      id={`${id}-colors-panel`}
                      aria-labelledby={`${id}-colors-tab`}
                      hidden={activeTab !== 'colors'}
                    >
                      <fieldset className="appearance-colors">
                        <legend>Accent color</legend>
                        {accents.map((accent) => (
                          <label
                            key={accent.id}
                            className="appearance-option appearance-color-option"
                            style={
                              {
                                '--option-accent-light': accent.light,
                                '--option-accent-dark': accent.dark,
                              } as CSSProperties
                            }
                            onClickCapture={(event) => {
                              if (event.detail > 0)
                                pointerOrigin.current = event.nativeEvent;
                            }}
                          >
                            {selectedAccent === accent.id && (
                              <motion.span
                                className="appearance-selection appearance-color-selection"
                                layoutId={`${id}-accent-selection`}
                                transition={{
                                  type: 'spring',
                                  stiffness: 500,
                                  damping: 35,
                                }}
                              />
                            )}
                            <input
                              type="radio"
                              name={`${id}-accent`}
                              value={accent.id}
                              checked={selectedAccent === accent.id}
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
                                  root.style.setProperty(
                                    '--accent-dark',
                                    accent.dark,
                                  );
                                  try {
                                    localStorage.setItem('accent', accent.id);
                                  } catch {}
                                  window.dispatchEvent(
                                    new Event('accent-change'),
                                  );
                                });
                              }}
                            />
                            <span
                              className="accent-swatch"
                              style={{ background: accent.light }}
                              aria-hidden="true"
                            />
                            <span className="appearance-option-name">
                              {accent.name}
                            </span>
                            <span className="appearance-option-status">
                              {selectedAccent === accent.id && <CheckIcon />}
                            </span>
                          </label>
                        ))}
                      </fieldset>
                    </div>
                    <div
                      className="appearance-tab-panel appearance-font-panel"
                      role="tabpanel"
                      id={`${id}-heading-font-panel`}
                      aria-labelledby={`${id}-heading-font-tab`}
                      hidden={activeTab !== 'heading-font'}
                    >
                      <fieldset className="appearance-font-group">
                        <legend>
                          <strong>Headings</strong>
                          <span>Page titles and section headings</span>
                        </legend>
                        {headingFonts.map((font) => (
                          <label
                            key={font.id}
                            className="appearance-option appearance-font-option appearance-heading-font-option"
                          >
                            {headingFont === font.id && (
                              <motion.span
                                className="appearance-selection appearance-font-selection"
                                layoutId={`${id}-heading-font-selection`}
                                transition={{
                                  type: 'spring',
                                  stiffness: 500,
                                  damping: 35,
                                }}
                              />
                            )}
                            <input
                              type="radio"
                              name={`${id}-heading-font`}
                              value={font.id}
                              checked={headingFont === font.id}
                              onChange={() => {
                                const root = document.documentElement;
                                root.dataset.headingFont = font.id;
                                try {
                                  localStorage.setItem('heading-font', font.id);
                                } catch {}
                                window.dispatchEvent(new Event('font-change'));
                              }}
                            />
                            <span className="font-option-copy">
                              <span
                                className="font-sample font-heading-sample"
                                style={{ fontFamily: fontFamily(font.id) }}
                              >
                                {font.sample}
                              </span>
                              <span className="font-name">{font.name}</span>
                            </span>
                            <span className="appearance-option-status">
                              {headingFont === font.id && <CheckIcon />}
                            </span>
                          </label>
                        ))}
                      </fieldset>
                    </div>
                    <div
                      className="appearance-tab-panel appearance-font-panel"
                      role="tabpanel"
                      id={`${id}-body-font-panel`}
                      aria-labelledby={`${id}-body-font-tab`}
                      hidden={activeTab !== 'body-font'}
                    >
                      <fieldset className="appearance-font-group">
                        <legend>
                          <strong>Body text</strong>
                          <span>Navigation, descriptions, and controls</span>
                        </legend>
                        {fonts.map((font) => (
                          <label
                            key={font.id}
                            className="appearance-option appearance-font-option appearance-body-font-option"
                          >
                            {bodyFont === font.id && (
                              <motion.span
                                className="appearance-selection appearance-font-selection"
                                layoutId={`${id}-body-font-selection`}
                                transition={{
                                  type: 'spring',
                                  stiffness: 500,
                                  damping: 35,
                                }}
                              />
                            )}
                            <input
                              type="radio"
                              name={`${id}-body-font`}
                              value={font.id}
                              checked={bodyFont === font.id}
                              onChange={() => {
                                const root = document.documentElement;
                                root.dataset.bodyFont = font.id;
                                try {
                                  localStorage.setItem('body-font', font.id);
                                } catch {}
                                window.dispatchEvent(new Event('font-change'));
                              }}
                            />
                            <span className="font-option-copy">
                              <span
                                className="font-sample font-body-sample"
                                style={{ fontFamily: fontFamily(font.id) }}
                              >
                                {font.sample}
                              </span>
                              <span className="font-name">{font.name}</span>
                            </span>
                            <span className="appearance-option-status">
                              {bodyFont === font.id && <CheckIcon />}
                            </span>
                          </label>
                        ))}
                      </fieldset>
                    </div>
                    <div className="appearance-footer">
                      <span>Defaults: Dark · Blue · Georgia · Outfit</span>
                      <button
                        className="appearance-reset"
                        type="button"
                        onClick={resetAppearance}
                      >
                        Reset defaults
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>,
          document.body,
        )}
    </div>
  );
}
