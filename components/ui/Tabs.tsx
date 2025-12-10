import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeId, onChange, className }) => {
  const [tabStyle, setTabStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab.id === activeId);
    const activeElement = tabsRef.current[activeIndex];

    if (activeElement) {
      setTabStyle({
        left: activeElement.offsetLeft,
        width: activeElement.offsetWidth,
      });
    }
  }, [activeId, tabs]);

  return (
    <div className={twMerge('flex justify-center', className)}>
      <div className="relative glass-liquid rounded-full p-2 inline-flex flex-wrap justify-center gap-2">
        {/* Animated Background Indicator */}
        <motion.div
          layout
          className="absolute top-2 bottom-2 bg-gradient-to-r from-primary-500/80 to-blue-500/80 rounded-full shadow-lg shadow-primary-500/20"
          initial={false}
          animate={{
            left: tabStyle.left,
            width: tabStyle.width,
            opacity: tabStyle.width ? 1 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25, // Slightly lower damping for "water drop" wobble/overshoot
            mass: 0.8,
          }}
        />

        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabsRef.current[index] = el;
            }}
            onClick={() => onChange(tab.id)}
            className={twMerge(
              'relative flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors duration-300 text-sm sm:text-base z-10 whitespace-nowrap',
              activeId === tab.id
                ? 'text-white'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
            )}
          >
            {tab.icon && <span className="text-lg">{tab.icon}</span>}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
