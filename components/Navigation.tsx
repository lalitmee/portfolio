import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaBars, FaTimes } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';
import portfolioData from '../data/portfolio.json';
import { Logo } from './Logo';
import ThemeDrawer from './ThemeDrawer';
import ThemeSwitcher from './ThemeSwitcher';
import ThemeToggle from './ThemeToggle';
import IconButton from './ui/IconButton';

interface NavigationProps {
  activeSection?: string;
  showBackArrow?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  showBackArrow,
}) => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileInNav, setShowProfileInNav] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(activeSection || 'home');
  const isManualScroll = React.useRef(false);
  const [showMobileName, setShowMobileName] = useState(false); // Add state for mobile name visibility

  const { scrollYProgress } = useScroll();
  // const scaleX = useSpring(scrollYProgress, {
  //   stiffness: 100,
  //   damping: 30,
  //   restDelta: 0.001,
  // });

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

  const downloadResume = () => {
    if (portfolioData.personal.resumeUrl) {
      window.open(portfolioData.personal.resumeUrl, '_blank');
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-blue-500 origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />
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
            // Apply glass-liquid only when scrolled
            isScrolled
              ? 'glass-liquid w-[98%] max-w-7xl'
              : 'w-[95%] max-w-7xl bg-transparent dark:bg-transparent shadow-none border border-primary-500/20 dark:border-primary-500/20 backdrop-filter-none',
          )}
        >
          {/* Back Arrow & Logo */}
          <div className="flex items-center space-x-3">
            {showBackArrow && (
              <IconButton
                onClick={() => {
                  if (window.history.length > 2) {
                    router.back();
                  } else {
                    router.push('/#projects');
                  }
                }}
                className="mr-2 lg:hidden text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20"
                ariaLabel="Go back"
              >
                <FaArrowLeft size={20} />
              </IconButton>
            )}

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
                    className="w-10 h-10 rounded-full border-2 border-primary-500 overflow-hidden"
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
                    className="w-10 h-10 bg-gradient-to-tr from-primary-500 to-blue-500 rounded-full flex items-center justify-center"
                  >
                    <Logo className="text-white" />
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
                  <span className="block h-5 leading-5">
                    {portfolioData.personal.name}
                  </span>
                  <span className="block h-5 leading-5 text-primary-600 dark:text-primary-400">
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
          </div>

          {/* Desktop Navigation - Hidden if showBackArrow (Details Page) is true */}
          {!showBackArrow && (
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
                      className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-blue-500/10 dark:from-primary-500/20 dark:to-blue-500/20 rounded-full border border-primary-200 dark:border-white/10 shadow-sm dark:shadow-none"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              ))}
            </div>
          )}

          {/* CTA Button and Theme Toggle */}
          <div className="hidden lg:flex items-center space-x-4">
            {portfolioData.settings.themeSelector === 'drawer' ? (
              <ThemeDrawer />
            ) : (
              <ThemeSwitcher />
            )}
            <ThemeToggle />
            {!showBackArrow && (
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                className="group relative px-6 py-2.5 rounded-full bg-gradient-to-r from-primary-500 to-blue-500 text-slate-900 font-semibold text-sm overflow-hidden inline-flex items-center justify-center"
              >
                <div className="absolute inset-[2px] rounded-full bg-white transition-opacity duration-300 group-hover:opacity-0" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  Let's Talk
                </span>
              </a>
            )}
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="lg:hidden flex items-center space-x-4 ml-auto">
            {portfolioData.settings.themeSelector === 'drawer' ? (
              <ThemeDrawer />
            ) : (
              <ThemeSwitcher />
            )}
            <ThemeToggle />
            {!showBackArrow && (
              <IconButton
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                ariaLabel="Toggle menu"
                className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/10"
              >
                {isMobileMenuOpen ? (
                  <FaTimes size={20} />
                ) : (
                  <FaBars size={20} />
                )}
              </IconButton>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Redesigned Mobile Menu Overlay - Liquid Glass */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.2 } }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Glass Background */}
            <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-[20px] backdrop-saturate-150" />

            {/* Animated Gradient Blob for Depth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary-500/30 blur-[100px] rounded-full pointer-events-none animate-pulse-slow" />

            {/* Content Container */}
            <motion.div
              className="relative z-50 flex flex-col items-center justify-center h-full px-6 space-y-8"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.1,
                  },
                },
              }}
            >
              {navigationItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  custom={index}
                  variants={{
                    hidden: (i) => ({
                      x: i % 2 === 0 ? -100 : 100,
                      opacity: 0,
                      filter: 'blur(10px)',
                    }),
                    visible: {
                      x: 0,
                      opacity: 1,
                      filter: 'blur(0px)',
                      transition: {
                        type: 'spring',
                        damping: 12,
                        stiffness: 100,
                        mass: 0.8,
                      },
                    },
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: index % 2 === 0 ? 2 : -2,
                    transition: { type: 'spring', stiffness: 400, damping: 10 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={twMerge(
                    'text-4xl font-bold tracking-tight',
                    activeTab === item.id
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-blue-500'
                      : 'text-gray-800 dark:text-gray-200',
                  )}
                >
                  {item.label}
                </motion.a>
              ))}

              <motion.div
                variants={{
                  hidden: { y: 50, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { type: 'spring', delay: 0.4 },
                  },
                }}
                className="pt-8"
              >
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contact');
                  }}
                  className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-primary-600 to-blue-600 text-white font-bold text-lg shadow-lg shadow-primary-500/25 transition-all duration-300 hover:scale-105 hover:shadow-primary-500/50"
                >
                  Let's Talk
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
