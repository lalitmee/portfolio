import Head from 'next/head';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

import { config } from '../config';
import portfolioData from '../data/portfolio.json';

import BlogArticles from '../components/BlogArticles';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import DigitalMarketingProjects from '../components/DigitalMarketingProjects';
import Footer from '../components/Footer';
import HomePage from '../components/HomePage';
import Navigation from '../components/Navigation';
import Projects from '../components/Projects';
import Quotes from '../components/Quotes';
import Resume from '../components/Resume';
import ScrollToTop from '../components/ScrollToTop';
import Skills from '../components/Skills';
import Testimonials from '../components/Testimonials';

// Global state to track if splash screen has been shown in this session (SPA navigation)
let hasShownSplash = false;

export default function Home() {
  // Initialize state based on global variable to prevent flash on back navigation
  const [loading, setLoading] = useState(() => {
    // If we've already shown it in this SPA session, don't show it again
    if (hasShownSplash) return false;
    return true;
  });

  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Check if we've defined the global yet (first mount)
    if (!hasShownSplash) {
      // Check session storage for page refreshes
      const sessionLoaded = sessionStorage.getItem('portfolio_loaded');

      if (sessionLoaded) {
        setLoading(false);
        hasShownSplash = true;
      } else {
        const timeout = setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem('portfolio_loaded', 'true');
          hasShownSplash = true;
        }, 1500);
        return () => clearTimeout(timeout);
      }
    }
  }, []);

  // Track active section using IntersectionObserver for better performance
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -35% 0px',
      threshold: [0, 1],
    };

    const visibleSections = new Set<string>();

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSections.add(entry.target.id);
        } else {
          visibleSections.delete(entry.target.id);
        }
      });

      // Determine the active section
      const sections = [
        'home',
        'about',
        'skills',
        'projects',
        'resume',
        'contact',
      ];

      // Find the first visible section from our ordered list
      const active = sections.find((section) => visibleSections.has(section));

      if (active) {
        setActiveSection(active);
      } else if (window.scrollY < 100) {
        // Fallback for top of page
        setActiveSection('home');
      }
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    const sections = [
      'home',
      'about',
      'skills',
      'projects',
      'resume',
      'contact',
    ];

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [loading]);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <LoadingSpinner
          size="xl"
          text="Preparing an exceptional experience..."
          className="min-h-screen"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-500">
      <Navigation activeSection={activeSection} />
      <Head>
        <title>Lalit Kumar - Senior Software Engineer | Portfolio</title>
        <meta
          name="description"
          content="Portfolio of Lalit Kumar, Senior Software Engineer with 7+ years of experience in React, TypeScript, Node.js, and modern web technologies. Available for new opportunities."
        />
        <meta
          name="keywords"
          content="Senior Software Engineer, React Developer, TypeScript, Node.js, Full Stack Developer, Frontend Engineer, Web Development, JavaScript"
        />
        <meta name="author" content="Lalit Kumar" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://lalitmee.github.io/portfolio/"
        />
        <meta
          property="og:title"
          content="Lalit Kumar - Senior Software Engineer"
        />
        <meta
          property="og:description"
          content="Senior Software Engineer with 7+ years of experience in modern web technologies"
        />
        <meta
          property="og:image"
          content="https://avatars1.githubusercontent.com/u/10762218?s=460&v=4"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://lalitmee.github.io/portfolio/"
        />
        <meta
          property="twitter:title"
          content="Lalit Kumar - Senior Software Engineer"
        />
        <meta
          property="twitter:description"
          content="Senior Software Engineer with 7+ years of experience in modern web technologies"
        />
        <meta
          property="twitter:image"
          content="https://avatars1.githubusercontent.com/u/10762218?s=460&v=4"
        />

        {/* Favicon */}
        {/* Favicon */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color */}
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="msapplication-TileColor" content="#8b5cf6" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </Head>

      <main className="relative overflow-x-hidden">
        {/* Hero Section */}
        <section id="home" className="animate-fade-in-up relative">
          <div
            id="hero-sentinel"
            className="absolute top-0 left-0 w-full h-[75vh] pointer-events-none bg-transparent"
            aria-hidden="true"
          />
          <HomePage />
        </section>

        {/* About/Skills Section */}
        <section
          id="about"
          className="animate-slide-in-left bg-gray-50/50 dark:bg-black/20 backdrop-blur-sm"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="py-20 bg-transparent">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {(portfolioData.sections as any).about.title}{' '}
                <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
                  {(portfolioData.sections as any).about.highlight}
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                {(portfolioData.sections as any).about.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12">
                <div className="text-center">
                  <div className="text-4xl mb-4">
                    {
                      (portfolioData.sections as any).about.cards.innovation
                        .icon
                    }
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {
                      (portfolioData.sections as any).about.cards.innovation
                        .title
                    }
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {
                      (portfolioData.sections as any).about.cards.innovation
                        .description
                    }
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">
                    {
                      (portfolioData.sections as any).about.cards.leadership
                        .icon
                    }
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {
                      (portfolioData.sections as any).about.cards.leadership
                        .title
                    }
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {
                      (portfolioData.sections as any).about.cards.leadership
                        .description
                    }
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">
                    {
                      (portfolioData.sections as any).about.cards.performance
                        .icon
                    }
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {
                      (portfolioData.sections as any).about.cards.performance
                        .title
                    }
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {
                      (portfolioData.sections as any).about.cards.performance
                        .description
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="animate-slide-in-right"
          style={{ animationDelay: '0.4s' }}
        >
          <Skills />
        </section>

        {/* Quotes Section */}
        {config.sections.quotes && (
          <section
            className="animate-slide-in-left"
            style={{ animationDelay: '0.6s' }}
          >
            <Quotes />
          </section>
        )}

        {/* Projects Section */}
        <section
          id="projects"
          className="animate-slide-in-right bg-gray-50/50 dark:bg-black/20 backdrop-blur-sm"
          style={{ animationDelay: '0.8s' }}
        >
          <Projects />
        </section>

        {/* Optional Sections */}
        {config.sections.certifications && (
          <section
            className="animate-slide-in-left"
            style={{ animationDelay: '1s' }}
          >
            <Certifications />
          </section>
        )}

        {config.sections.blogArticles && (
          <section
            className="animate-slide-in-right"
            style={{ animationDelay: '1.2s' }}
          >
            <BlogArticles />
          </section>
        )}

        {config.sections.digitalMarketingProjects && (
          <section
            className="animate-slide-in-left"
            style={{ animationDelay: '1.4s' }}
          >
            <DigitalMarketingProjects />
          </section>
        )}

        {config.sections.testimonials && (
          <section
            className="animate-slide-in-right"
            style={{ animationDelay: '1.6s' }}
          >
            <Testimonials />
          </section>
        )}

        {/* Resume Section */}
        <section
          id="resume"
          className="animate-slide-in-left"
          style={{ animationDelay: '1.8s' }}
        >
          <Resume />
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="animate-slide-in-right bg-gray-50/50 dark:bg-black/20 backdrop-blur-sm"
          style={{ animationDelay: '2s' }}
        >
          <Contact />
        </section>

        {/* Footer */}
        <section
          className="animate-fade-in-up"
          style={{ animationDelay: '2.2s' }}
        >
          <Footer />
        </section>
      </main>

      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div
          className="h-full bg-gradient-to-r from-primary-600 to-blue-600 transition-all duration-300"
          style={{
            width: `${
              typeof window !== 'undefined'
                ? (window.scrollY /
                    (document.documentElement.scrollHeight -
                      window.innerHeight)) *
                  100
                : 0
            }%`,
          }}
        />
      </div>

      <ScrollToTop />
    </div>
  );
}
