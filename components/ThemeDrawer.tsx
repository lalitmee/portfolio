import { AnimatePresence, motion } from 'framer-motion';
import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  FaChevronLeft,
  FaChevronRight,
  FaPalette,
  FaTimes,
} from 'react-icons/fa';
import IconButton from './ui/IconButton';

const themes = [
  { name: 'default', label: 'Default', color: '#8b5cf6' },
  { name: 'cobalt2', label: 'Cobalt2', color: '#ffc600' },
  { name: 'terminal', label: 'Terminal', color: '#4ade80' },
  { name: 'catppuccin', label: 'Catppuccin', color: '#cba6f7' },
  { name: 'neovim', label: 'Neovim', color: '#A6DBFF' },
  { name: 'dracula', label: 'Dracula', color: '#ff79c6' },
  { name: 'monokai', label: 'Monokai', color: '#e6db74' },
  { name: 'nord', label: 'Nord', color: '#88c0d0' },
  { name: 'gruvbox', label: 'Gruvbox', color: '#fe8019' },
  { name: 'solarized', label: 'Solarized', color: '#2aa198' },
];

const containerVariants = {
  hidden: {
    x: '100%',
    opacity: 0,
    // Keep drawer dimensions for slide-in effect
    top: 0,
    right: 0,
    width: '20rem',
    height: '100%',
    borderRadius: '0px',
  },
  drawer: {
    top: 0,
    right: 0,
    // Removed 'left' to avoid auto-interpolation issues
    bottom: 0,
    x: 0,
    y: 0,
    width: '20rem',
    height: '100%',
    borderRadius: '0px',
    opacity: 1,
  },
  modal: {
    top: '50%',
    // Center horizontally using right: 50% + x: 50% (moves right edge to center, then shifts right by half width)
    right: '50%',
    x: '50%',
    y: '-50%',
    width: '90vw',
    maxWidth: '500px',
    height: 'auto',
    maxHeight: '85vh',
    minHeight: '300px',
    borderRadius: '24px',
    opacity: 1,
  },
};

const ThemeDrawer: React.FC = () => {
  const [theme, setTheme] = useState('default');
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'drawer' | 'modal'>('drawer');
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Check cookie first, then generic fallback
    const savedTheme = Cookies.get('theme') || 'default';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const switchTheme = (newTheme: string) => {
    setTheme(newTheme);
    Cookies.set('theme', newTheme, { expires: 365, sameSite: 'strict' });
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Close when clicking outside content
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If drawer is open and click is outside the drawer content
      if (
        isOpen &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Reset view mode when closing
  useEffect(() => {
    if (!isOpen) {
      // Small delay to let exit animation finish before resetting state ideally,
      // but instant reset is fine for now or we can reset on open.
      // Let's reset when opening instead to ensure fresh state.
    } else {
      setViewMode('drawer');
    }
  }, [isOpen]);

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'drawer' ? 'modal' : 'drawer'));
  };

  return (
    <>
      <IconButton
        onClick={() => setIsOpen(true)}
        ariaLabel="Change Theme"
        className={isOpen ? 'ring-2 ring-primary-500/50' : ''}
      >
        <FaPalette className="text-gray-700 dark:text-gray-200 w-4 h-4" />
      </IconButton>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90]"
                  onClick={() => setIsOpen(false)}
                />

                {/* Animated Container (Drawer/Modal) */}
                <motion.div
                  ref={containerRef}
                  layout
                  variants={containerVariants}
                  initial="hidden"
                  animate={viewMode}
                  exit="hidden"
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="fixed glass-liquid-fixed z-[100] shadow-2xl border border-white/20"
                >
                  <div className="relative h-full flex flex-col p-6">
                    {/* Header */}
                    <motion.div
                      layout
                      className="flex items-center justify-between mb-6 shrink-0"
                    >
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <FaPalette className="text-primary-500" />
                        <span>Select Theme</span>
                      </h2>
                      <div className="flex items-center gap-2">
                        {/* Only show close button in modal mode, or both? Let's keep it consistent */}
                        <button
                          onClick={() => setIsOpen(false)}
                          className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors text-gray-500 dark:text-gray-400"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </motion.div>

                    {/* Swinging Trigger Button */}
                    <motion.div
                      layout
                      initial={false}
                      animate={{
                        left: viewMode === 'drawer' ? '0%' : '100%',
                        x: '-50%',
                      }}
                      className="absolute top-1/2 -translate-y-1/2 z-50"
                    >
                      <motion.button
                        onClick={toggleViewMode}
                        animate={{
                          x: viewMode === 'drawer' ? [0, -5, 0] : [0, 5, 0],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                          ease: 'easeInOut',
                        }}
                        className="bg-white dark:bg-gray-800 text-primary-500 p-2 rounded-full shadow-lg border border-primary-100 dark:border-primary-900/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                        title={
                          viewMode === 'drawer'
                            ? 'Switch to Grid View'
                            : 'Switch to List View'
                        }
                      >
                        {viewMode === 'drawer' ? (
                          <FaChevronLeft className="w-4 h-4" />
                        ) : (
                          <FaChevronRight className="w-4 h-4" />
                        )}
                      </motion.button>
                    </motion.div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 custom-scrollbar">
                      <AnimatePresence mode="wait">
                        {viewMode === 'drawer' ? (
                          <motion.div
                            key="list-view"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-3 pb-4"
                          >
                            {themes.map((t) => (
                              <div
                                key={t.name}
                                className="relative group w-full rounded-xl overflow-hidden"
                              >
                                {/* Masked Rotating Gradient Border */}
                                <div
                                  className="absolute inset-0 z-0 pointer-events-none rounded-xl"
                                  style={{
                                    WebkitMask:
                                      'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                    WebkitMaskComposite: 'xor',
                                    maskComposite: 'exclude',
                                    padding: '1.5px', // Reduced from 2.5px per feedback
                                  }}
                                >
                                  <div
                                    className="absolute inset-[-100%] animate-spin-border"
                                    style={{
                                      // Max visibility: high opacity start to full opacity end
                                      background: `conic-gradient(from 90deg, ${t.color}88 0%, ${t.color} 100%)`,
                                    }}
                                  />
                                </div>

                                <button
                                  onClick={() => switchTheme(t.name)}
                                  className={`relative w-full h-full text-left px-4 py-4 flex items-center justify-between rounded-xl transition-all duration-200 ${
                                    theme === t.name
                                      ? 'bg-primary-500/10'
                                      : 'bg-white/90 dark:bg-gray-900/90 hover:bg-white dark:hover:bg-gray-800'
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <span
                                      className="w-8 h-8 rounded-full border-1 border-white/20 shadow-md ring-2 ring-transparent transition-all duration-300 group-hover:scale-110"
                                      style={{ backgroundColor: t.color }}
                                    />
                                    <span
                                      className={`font-semibold ${
                                        theme === t.name
                                          ? 'text-primary-600 dark:text-primary-400'
                                          : 'text-gray-700 dark:text-gray-200'
                                      }`}
                                    >
                                      {t.label}
                                    </span>
                                  </div>
                                  {theme === t.name && (
                                    <motion.div
                                      layoutId="activeThemeList"
                                      className="w-2.5 h-2.5 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(var(--primary-500),0.6)]"
                                    />
                                  )}
                                </button>
                              </div>
                            ))}
                          </motion.div>
                        ) : (
                          <motion.div
                            key="grid-view"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 p-4 pb-6"
                          >
                            {themes.map((t) => (
                              <div
                                key={t.name}
                                className="relative group w-full aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                                title={t.label}
                              >
                                {/* Masked Rotating Gradient Border */}
                                <div
                                  className="absolute inset-0 z-0 pointer-events-none rounded-2xl"
                                  style={{
                                    WebkitMask:
                                      'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                    WebkitMaskComposite: 'xor',
                                    maskComposite: 'exclude',
                                    padding: '2px',
                                  }}
                                >
                                  <div
                                    className="absolute inset-[-100%] animate-spin-border group-hover:animate-spin"
                                    style={{
                                      // Boosted opacity
                                      background: `conic-gradient(from 90deg, ${t.color}88 0%, ${t.color} 100%)`,
                                    }}
                                  />
                                </div>

                                <button
                                  onClick={() => switchTheme(t.name)}
                                  className={`relative w-full h-full rounded-2xl overflow-hidden transition-all duration-300 ${
                                    theme === t.name
                                      ? 'bg-white/10 dark:bg-black/10'
                                      : 'bg-white/5 dark:bg-black/5 hover:bg-white/10 dark:hover:bg-black/10'
                                  }`}
                                >
                                  {/* Tint Layer */}
                                  <div
                                    className={`absolute inset-0 transition-opacity duration-300 ${
                                      theme === t.name
                                        ? 'opacity-20'
                                        : 'opacity-10 group-hover:opacity-20'
                                    }`}
                                    style={{ backgroundColor: t.color }}
                                  />

                                  {/* Glass Reflection/Sheen */}
                                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />

                                  {/* Active Indicator (Centered & Larger) */}
                                  {theme === t.name && (
                                    <motion.div
                                      layoutId="activeThemeGrid"
                                      transition={{
                                        type: 'spring',
                                        stiffness: 300,
                                        damping: 30,
                                      }}
                                      className="absolute inset-0 flex items-center justify-center z-10"
                                    >
                                      <div
                                        className="w-8 h-8 rounded-full shadow-lg flex items-center justify-center"
                                        style={{ backgroundColor: t.color }}
                                      >
                                        <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                                      </div>
                                    </motion.div>
                                  )}
                                </button>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
};

export default ThemeDrawer;
