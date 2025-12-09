import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';
import portfolioData from '../data/portfolio.json';
import { Logo } from './Logo';
import ThemeToggle from './ThemeToggle';

interface NavigationProps {
  activeSection?: string;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileInNav, setShowProfileInNav] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(activeSection || 'home');
  const isManualScroll = React.useRef(false);
  const [showMobileName, setShowMobileName] = useState(false); // Add state for mobile name visibility

  useEffect(() => {
    if (activeSection && !isManualScroll.current) {
      setActiveTab(activeSection);
    }
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldBeScrolled = scrollY > 20;
      if (isScrolled !== shouldBeScrolled) {
        setIsScrolled(shouldBeScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowProfileInNav(!entry.isIntersecting);
        setShowMobileName(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    const sentinel = document.getElementById('hero-sentinel');
    if (sentinel) {
      observer.observe(sentinel);
    }

    // Retry finding sentinel if not immediately available (failsafe)
    const retryInterval = setInterval(() => {
      const el = document.getElementById('hero-sentinel');
      if (el) {
        observer.observe(el);
        clearInterval(retryInterval);
      }
    }, 100);

    // Clear interval after 2 seconds to stop polling
    const timeout = setTimeout(() => clearInterval(retryInterval), 2000);

    return () => {
      observer.disconnect();
      clearInterval(retryInterval);
      clearTimeout(timeout);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    isManualScroll.current = true;

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Account for floating header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
    setIsMobileMenuOpen(false);

    // Reset manual scroll flag after animation
    setTimeout(() => {
      isManualScroll.current = false;
    }, 1000);
  };

  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'resume', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={twMerge(
          'fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 transition-all duration-300',
          isScrolled ? 'pt-2' : 'pt-4',
        )}
      >
        <div
          className={twMerge(
            'relative flex items-center justify-between px-4 sm:px-6 py-2 rounded-full transition-all duration-500',
            'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-2xl shadow-purple-500/10',
            isScrolled
              ? 'w-[98%] max-w-7xl border-opacity-100'
              : 'w-[95%] max-w-7xl border-opacity-0 bg-transparent dark:bg-transparent shadow-none',
          )}
        >
          {/* Logo - Centered on mobile, Left on desktop */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className="flex items-center space-x-3 group relative h-10 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {showProfileInNav ? (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                  className="w-10 h-10 rounded-full border-2 border-purple-500 overflow-hidden"
                >
                  <img
                    src={portfolioData.personal.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="code"
                  initial={{ opacity: 0, scale: 0.5, rotate: 90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: -90 }}
                  transition={{ duration: 0.3 }}
                  className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300"
                >
                  <Logo className="text-white w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Desktop Name */}
            <div className="hidden sm:block overflow-hidden h-5">
              <motion.div
                initial={{ y: 0 }}
                whileHover={{ y: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <span className="block h-5">{portfolioData.personal.name}</span>
                <span className="block h-5 text-purple-600 dark:text-purple-400">
                  {portfolioData.personal.name}
                </span>
              </motion.div>
            </div>

            {/* Mobile Name */}
            <AnimatePresence>
              {showMobileName && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="block sm:hidden font-bold text-gray-900 dark:text-white"
                >
                  {portfolioData.personal.name}
                </motion.div>
              )}
            </AnimatePresence>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center bg-gray-100 dark:bg-white/5 rounded-full px-2 py-1.5 border border-gray-200 dark:border-white/5">
            {navigationItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={twMerge(
                  'relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300',
                  activeTab === item.id
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
                )}
              >
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20 rounded-full border border-purple-200 dark:border-white/10 shadow-sm dark:shadow-none"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            ))}
          </div>

          {/* CTA Button and Theme Toggle */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className="group relative px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-slate-900 font-semibold text-sm overflow-hidden inline-flex items-center justify-center"
            >
              <div className="absolute inset-[2px] rounded-full bg-white transition-opacity duration-300 group-hover:opacity-0" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                Let's Talk
              </span>
            </a>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="lg:hidden flex items-center space-x-4 ml-auto">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden pt-24 px-4 bg-slate-900/95 backdrop-blur-xl"
          >
            <div className="flex flex-col items-center space-y-4">
              {navigationItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={twMerge(
                    'text-xl font-medium py-2 px-6 rounded-xl transition-all w-full text-center',
                    activeTab === item.id
                      ? 'bg-gray-100 dark:bg-purple-500/20 text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5',
                  )}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navigationItems.length * 0.1 }}
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-full font-semibold"
              >
                Let's Talk
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
