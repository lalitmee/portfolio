import React from 'react';
import { twMerge } from 'tailwind-merge';

interface IconButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  ariaLabel: string;
  className?: string;
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  children,
  ariaLabel,
  className,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className={twMerge(
        // Base styles
        'relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 backdrop-blur-md border outline-none focus:ring-2 focus:ring-primary-500/50',

        // Light Mode
        'bg-white/50 hover:bg-white/80 border-gray-200 text-gray-700 hover:text-primary-600 shadow-sm',

        // Dark Mode
        'dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 dark:text-gray-300 dark:hover:text-white',

        // Interaction
        'hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',

        className,
      )}
    >
      {children}
    </button>
  );
};

export default IconButton;
