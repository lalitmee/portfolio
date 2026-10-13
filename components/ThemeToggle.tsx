import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label={`Use ${theme === 'dark' ? 'light' : 'dark'} theme`}
      title={`Use ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {theme === 'dark' ? '☀' : '◐'}
    </button>
  );
};

export default ThemeToggle;
