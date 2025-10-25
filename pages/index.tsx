import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { config } from '../config';

// Import Navigation component
const Navigation = dynamic(() => import('../components/Navigation'), {
  ssr: false,
});

const HomePage = dynamic(() => import('../components/HomePage'), {
  loading: () => <LoadingSpinner size="xl" text="Loading Portfolio..." />,
});
const Skills = dynamic(() => import('../components/Skills'), {
  loading: () => <LoadingSpinner size="lg" variant="skeleton" />,
});
const Quotes = dynamic(() => import('../components/Quotes'), {
  loading: () => <LoadingSpinner size="md" variant="pulse" />,
});
const Projects = dynamic(() => import('../components/Projects'), {
  loading: () => <LoadingSpinner size="lg" variant="skeleton" />,
});
const Certifications = dynamic(() => import('../components/Certifications'), {
  loading: () => <LoadingSpinner size="md" variant="skeleton" />,
});
const BlogArticles = dynamic(() => import('../components/BlogArticles'), {
  loading: () => <LoadingSpinner size="md" variant="skeleton" />,
});
const DigitalMarketingProjects = dynamic(
  () => import('../components/DigitalMarketingProjects'),
  { loading: () => <LoadingSpinner size="md" variant="skeleton" /> },
);
const Testimonials = dynamic(() => import('../components/Testimonials'), {
  loading: () => <LoadingSpinner size="md" variant="pulse" />,
});
const Resume = dynamic(() => import('../components/Resume'), {
  loading: () => <LoadingSpinner size="lg" variant="skeleton" />,
});
const Contact = dynamic(() => import('../components/Contact'), {
  loading: () => <LoadingSpinner size="lg" variant="skeleton" />,
});
const Footer = dynamic(() => import('../components/Footer'), {
  loading: () => (
    <LoadingSpinner size="sm" variant="pulse" className="bg-gray-900" />
  ),
});

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setDarkMode(prefersDark);
    }

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'home',
        'about',
        'skills',
        'projects',
        'resume',
        'contact',
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Save preference
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <LoadingSpinner
          size="xl"
          text="Preparing an exceptional experience..."
          className="min-h-screen"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 transition-colors duration-500">
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
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

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
        <section id="home" className="animate-fade-in-up">
          <HomePage />
        </section>

        {/* About/Skills Section */}
        <section
          id="about"
          className="animate-slide-in-left"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                About{' '}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Me
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8">
                I'm a passionate Senior Software Engineer with over 7 years of
                experience building scalable web applications and leading
                high-performing teams. I specialize in modern JavaScript
                frameworks, cloud architecture, and creating exceptional user
                experiences that drive business growth.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12">
                <div className="text-center">
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Innovation
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Always exploring cutting-edge technologies to solve complex
                    problems
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">👥</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Leadership
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Leading teams and mentoring developers to achieve
                    exceptional results
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Performance
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Optimizing applications for speed, scalability, and user
                    experience
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
          className="animate-slide-in-right"
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
          className="animate-slide-in-right"
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
          className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300"
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
    </div>
  );
}
