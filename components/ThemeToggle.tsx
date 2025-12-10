import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import IconButton from './ui/IconButton';

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
    <IconButton
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      ariaLabel="Toggle theme"
    >
      {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
    </IconButton>
  );
};

export default ThemeToggle;
