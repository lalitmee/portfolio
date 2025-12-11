import { AnimatePresence, motion } from 'framer-motion';
import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaPalette, FaTimes } from 'react-icons/fa';
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

const ThemeDrawer: React.FC = () => {
  const [theme, setTheme] = useState('default');
  const [isOpen, setIsOpen] = useState(false);
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
    // Don't close automatically on desktop for better exploring, but maybe close on mobile?
    // For a drawer, usually you might want to keep it open until closed.
    // Let's keep it open for user to try multiple themes.
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

                {/* Drawer */}
                <motion.div
                  ref={containerRef}
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                  className="fixed top-0 right-0 h-full w-80 glass-liquid-fixed z-[100] shadow-2xl border-l border-white/20 overflow-y-auto"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <FaPalette className="text-primary-500" />
                        <span>Select Theme</span>
                      </h2>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors text-gray-500 dark:text-gray-400"
                      >
                        <FaTimes />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {themes.map((t) => (
                        <button
                          key={t.name}
                          onClick={() => switchTheme(t.name)}
                          className={`w-full text-left px-4 py-4 flex items-center justify-between rounded-xl transition-all duration-200 border group ${
                            theme === t.name
                              ? 'bg-primary-500/10 border-primary-500/50 shadow-[0_0_15px_rgba(var(--primary-500),0.3)]'
                              : 'bg-white/30 dark:bg-black/20 border-white/10 hover:bg-white/50 dark:hover:bg-black/40 hover:scale-[1.02]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="w-8 h-8 rounded-full border-2 border-white/20 shadow-md ring-2 ring-transparent transition-all duration-300 group-hover:scale-110"
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
                              layoutId="activeTheme"
                              className="w-2.5 h-2.5 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(var(--primary-500),0.6)]"
                            />
                          )}
                        </button>
                      ))}
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
