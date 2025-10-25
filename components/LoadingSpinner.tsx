import React from 'react';
import { twMerge } from 'tailwind-merge';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'skeleton' | 'pulse';
  className?: string;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'spinner',
  className,
  text,
}) => {
  const sizeClasses = {
    sm: 'h-32',
    md: 'h-64',
    lg: 'h-96',
    xl: 'min-h-screen',
  };

  const spinnerSizes = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16',
    lg: 'h-24 w-24',
    xl: 'h-32 w-32',
  };

  if (variant === 'spinner') {
    return (
      <div
        className={twMerge(
          'flex flex-col items-center justify-center',
          sizeClasses[size],
          className,
        )}
      >
        <div className="relative">
          <div
            className={twMerge(
              'animate-spin rounded-full border-4 border-purple-200 border-t-purple-600',
              spinnerSizes[size],
            )}
          />
          {size === 'xl' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">LK</span>
              </div>
            </div>
          )}
        </div>
        {text && (
          <div className="mt-4 text-center">
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              {text}
            </p>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'skeleton') {
    return (
      <div
        className={twMerge(
          'flex items-center justify-center',
          sizeClasses[size],
          className,
        )}
      >
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg w-full max-w-4xl h-full" />
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div
        className={twMerge(
          'flex items-center justify-center',
          sizeClasses[size],
          className,
        )}
      >
        <div className="animate-pulse space-y-4 w-full max-w-4xl">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        </div>
      </div>
    );
  }

  return null;
};

export default LoadingSpinner;
