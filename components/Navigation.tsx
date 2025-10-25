import React, { useEffect, useState } from 'react';
import { FaBars, FaCode, FaTimes } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

interface NavigationProps {
  activeSection?: string;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
    setIsMobileMenuOpen(false);
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
      <nav
        className={twMerge(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-purple-500/10'
            : 'bg-transparent',
        )}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center space-x-3 group"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FaCode className="text-white text-xl" />
              </div>
              <div className="hidden sm:block">
                <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Lalit Kumar
                </div>
                <div className="text-xs text-gray-400">
                  Senior Software Engineer
                </div>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={twMerge(
                    'relative px-6 py-3 rounded-xl font-medium transition-all duration-300 group',
                    activeSection === item.id
                      ? 'text-white bg-white/10 backdrop-blur-md'
                      : 'text-gray-300 hover:text-white hover:bg-white/5',
                  )}
                >
                  <span className="relative z-10">{item.label}</span>

                  {/* Active indicator */}
                  {activeSection === item.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-500/30" />
                  )}

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300"
              >
                Let's Talk
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={twMerge(
          'fixed inset-0 z-40 lg:hidden transition-all duration-500',
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none',
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen space-y-8">
          {navigationItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={twMerge(
                'text-2xl font-semibold transition-all duration-500 hover:scale-110',
                activeSection === item.id
                  ? 'text-white bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-4 rounded-2xl'
                  : 'text-gray-300 hover:text-white',
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={() => scrollToSection('contact')}
            className="mt-8 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300"
          >
            Get In Touch
          </button>
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-purple-500 to-blue-500 transform origin-left scale-x-0 transition-transform duration-300"
        style={{
          transform: `scaleX(${Math.min(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight), 1)})`,
        }}
      />
    </>
  );
};

export default Navigation;
