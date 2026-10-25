import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from './icons/AnimatedIcons';
import { animateAppearanceChange } from '../utils/appearance-motion';

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
      onClick={(event) =>
        animateAppearanceChange(
          event,
          () => setTheme(isDark ? 'light' : 'dark'),
          'theme',
        )
      }
    >
      <span className="theme-toggle-icon">
        {mounted && isDark ? (
          <SunIcon />
        ) : (
          <MoonIcon />
        )}
      </span>
    </button>
  );
}
