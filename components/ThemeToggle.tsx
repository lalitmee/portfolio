import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = resolvedTheme === 'dark';

  useEffect(() => setMounted(true), []);

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={
        mounted
          ? `Switch to ${isDark ? 'light' : 'dark'} mode`
          : 'Toggle color theme'
      }
      aria-pressed={mounted ? isDark : undefined}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <span className="theme-toggle-icon">
        {mounted && isDark ? (
          <MdLightMode aria-hidden="true" />
        ) : (
          <MdDarkMode aria-hidden="true" />
        )}
      </span>
    </button>
  );
}
