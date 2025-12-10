import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { FaPalette } from 'react-icons/fa';

import Cookies from 'js-cookie';
import BottomSheet from './ui/BottomSheet';
import IconButton from './ui/IconButton';

const themes = [
  { name: 'default', label: 'Default', color: '#8b5cf6' },
  { name: 'cobalt2', label: 'Cobalt2', color: '#ffc600' },
  { name: 'terminal', label: 'Terminal', color: '#4ade80' },
  { name: 'catppuccin', label: 'Catppuccin', color: '#cba6f7' },
  { name: 'neovim', label: 'Neovim', color: '#3bda55' },
  { name: 'dracula', label: 'Dracula', color: '#ff79c6' },
  { name: 'monokai', label: 'Monokai', color: '#e6db74' },
  { name: 'nord', label: 'Nord', color: '#88c0d0' },
  { name: 'gruvbox', label: 'Gruvbox', color: '#fe8019' },
  { name: 'solarized', label: 'Solarized', color: '#2aa198' },
];

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState('default');
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check cookie first, then generic fallback
    const savedTheme = Cookies.get('theme') || 'default';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Media query check
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint is 1024px
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const switchTheme = (newTheme: string) => {
    setTheme(newTheme);
    Cookies.set('theme', newTheme, { expires: 365, sameSite: 'strict' });
    document.documentElement.setAttribute('data-theme', newTheme);
    setIsOpen(false);
  };

  const ThemeList = () => (
    <>
      <div className="hidden lg:block px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        Select Theme
      </div>
      {themes.map((t) => (
        <button
          key={t.name}
          onClick={() => switchTheme(t.name)}
          className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors ${
            theme === t.name
              ? 'text-primary-500'
              : 'text-gray-700 dark:text-gray-200'
          }`}
        >
          <span
            className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
            style={{ backgroundColor: t.color }}
          />
          <span className="font-medium">{t.label}</span>
        </button>
      ))}
    </>
  );

  return (
    <div className="relative z-50" ref={containerRef}>
      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        ariaLabel="Change Theme"
        className={isOpen ? 'ring-2 ring-primary-500/50' : ''}
      >
        <FaPalette className="text-gray-700 dark:text-gray-200 w-4 h-4" />
      </IconButton>

      {/* Desktop Dropdown */}
      <AnimatePresence>
        {isOpen && !isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-48 py-2 glass-liquid rounded-xl overflow-hidden z-50"
          >
            <ThemeList />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Sheet */}
      <BottomSheet
        isOpen={isOpen && isMobile}
        onClose={() => setIsOpen(false)}
        title="Select Theme"
      >
        <div className="flex flex-col space-y-2">
          {themes.map((t) => (
            <button
              key={t.name}
              onClick={() => switchTheme(t.name)}
              className={`w-full text-left px-4 py-4 flex items-center justify-between rounded-xl transition-colors border ${
                theme === t.name
                  ? 'bg-primary-50 dark:bg-primary-500/10 border-primary-200 dark:border-primary-500/30'
                  : 'bg-gray-50 dark:bg-white/5 border-transparent hover:bg-gray-100 dark:hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 shadow-sm"
                  style={{ backgroundColor: t.color }}
                />
                <span
                  className={`font-medium text-lg ${theme === t.name ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-200'}`}
                >
                  {t.label}
                </span>
              </div>

              {theme === t.name && (
                <div className="w-3 h-3 rounded-full bg-primary-500 shadow-sm" />
              )}
            </button>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
};

export default ThemeSwitcher;
