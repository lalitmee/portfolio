import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface GlassButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

const GlassButton: React.FC<GlassButtonProps> = ({
  href,
  onClick,
  children,
  className,
  icon,
}) => {
  const baseClasses = twMerge(
    'inline-flex items-center space-x-2',
    'px-5 py-2.5 rounded-full',
    'bg-white/10 dark:bg-black/20',
    'backdrop-blur-md border border-white/20 dark:border-white/10',
    'text-gray-900 dark:text-white font-medium',
    'shadow-lg shadow-black/5',
    'transition-all duration-300 ease-out',
    'hover:bg-white/20 dark:hover:bg-black/40',
    'hover:scale-105 hover:shadow-xl',
    'active:scale-95',
    'z-50',
    className,
  );

  const content = (
    <>
      {icon && <span className="text-xl">{icon}</span>}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
};

export default GlassButton;
