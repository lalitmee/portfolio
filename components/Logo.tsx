import React from 'react';
import { twMerge } from 'tailwind-merge';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={twMerge(
        'relative flex items-center justify-center w-6 h-6 select-none',
        className,
      )}
    >
      {/* Geometric L construction */}
      <div className="relative w-4 h-5">
        {/* Vertical Bar */}
        <div className="absolute left-0 top-0 w-[5px] h-full bg-current rounded-[3px]"></div>
        {/* Bottom Bar */}
        <div className="absolute left-0 bottom-0 w-full h-[5px] bg-current rounded-[3px]"></div>
      </div>
    </div>
  );
};
