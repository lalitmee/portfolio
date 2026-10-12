import { useTheme } from 'next-themes';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? (
        <MdLightMode aria-hidden="true" />
      ) : (
        <MdDarkMode aria-hidden="true" />
      )}
    </button>
  );
}
