import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 10%
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;

      if (scrollHeight > 0 && scrolled / scrollHeight > 0.1) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -8, 0], // Bounce effect
          }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{
            opacity: { duration: 0.2 },
            scale: { duration: 0.2 },
            y: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatDelay: 1,
            },
          }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[100] p-3 rounded-full bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
