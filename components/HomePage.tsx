import React, { useEffect, useRef, useState } from 'react';
import {
  FaBrain,
  FaChevronDown,
  FaCode,
  FaEnvelope,
  FaGithub,
  FaLightbulb,
  FaLinkedin,
  FaRocket,
  FaTwitter,
} from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';
import portfolioData from '../data/portfolio.json';
import { TopmateIcon } from './icons/TopmateIcon';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

const HomePage: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const isComponentVisible = useRef(true);

  useEffect(() => {
    setIsVisible(true);
    setIsMobile(window.innerWidth < 1024);

    const initParticles = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const particles: Particle[] = [];
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
      particlesRef.current = particles;
    };

    const animate = () => {
      if (!isComponentVisible.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`;
        ctx.fill();
      });

      // Draw connections
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      initParticles(); // Re-init on resize
    };

    window.addEventListener('resize', handleResize);

    // Intersection Observer to pause animation when not in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isComponentVisible.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (!animationRef.current) animate();
        }
      },
      { threshold: 0 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return FaGithub;
      case 'linkedin':
        return FaLinkedin;
      case 'twitter':
        return FaTwitter;
      case 'topmate':
        return TopmateIcon;
      default:
        return FaGithub;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setMousePosition({
      x: clientX - centerX,
      y: clientY - centerY,
    });
  };

  return (
    <>
      <div
        ref={containerRef}
        className="relative min-h-screen overflow-hidden bg-transparent transition-colors duration-500"
        id="home"
        onMouseMove={handleMouseMove}
      >
        {/* Animated Background Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          width={1920}
          height={1080}
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-blue-500/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/5 to-transparent" />

        {/* Floating Geometric Shapes - Hidden on mobile */}
        <div className="hidden lg:block absolute top-20 left-20 w-32 h-32 border border-primary-500/20 rounded-full animate-spin-slow" />
        <div className="hidden lg:block absolute top-40 right-32 w-24 h-24 border border-blue-500/20 rotate-45 animate-pulse" />
        <div className="hidden lg:block absolute bottom-32 left-40 w-16 h-16 bg-gradient-to-r from-primary-500/20 to-blue-500/20 rounded-lg animate-float" />

        {/* Main Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-6 pt-24 lg:pt-28">
          <div className="max-w-6xl mx-auto w-full">
            {/* Mobile Layout */}
            <div className="lg:hidden">
              {/* Name - Center aligned on mobile */}
              <div className="text-center mb-8">
                <h1
                  id="home-name-mobile"
                  className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3"
                >
                  {portfolioData.personal.name}
                </h1>
                <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 rounded-full px-4 py-2 text-sm text-gray-900 dark:text-white shadow-sm">
                  <FaBrain className="text-primary-600 dark:text-primary-400" />
                  <span>{portfolioData.personal.subtitle}</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </div>
              </div>

              {/* Profile Card - First on mobile */}
              <div className="flex justify-center mb-8 px-4">
                <div className="relative w-full max-w-[25rem] aspect-square">
                  <div className="absolute inset-0 bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl flex items-center justify-center">
                    {/* Profile Image */}
                    <div className="relative">
                      <img
                        src={portfolioData.personal.profileImage}
                        alt={portfolioData.personal.name}
                        className="w-44 h-44 rounded-2xl object-cover border-4 border-gray-200 dark:border-white/30"
                      />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      </div>
                    </div>
                    {/* Floating Tech Icons */}
                    <div
                      className="absolute top-8 left-8 w-10 h-10 bg-gradient-to-r from-primary-500/20 to-blue-500/20 backdrop-blur-md rounded-xl flex items-center justify-center animate-float"
                      style={{ animationDelay: '0.5s' }}
                    >
                      <span className="text-gray-900 dark:text-white font-bold text-sm">
                        ⚛️
                      </span>
                    </div>
                    <div
                      className="absolute top-8 right-8 w-10 h-10 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md rounded-xl flex items-center justify-center animate-float"
                      style={{ animationDelay: '2s' }}
                    >
                      <span className="text-gray-900 dark:text-white font-bold text-sm">
                        TS
                      </span>
                    </div>
                    <div
                      className="absolute bottom-24 left-8 w-10 h-10 bg-gradient-to-r from-green-500/20 to-teal-500/20 backdrop-blur-md rounded-xl flex items-center justify-center animate-float"
                      style={{ animationDelay: '1s' }}
                    >
                      <span className="text-gray-900 dark:text-white font-bold text-sm">
                        🚀
                      </span>
                    </div>
                    <div
                      className="absolute bottom-16 right-8 w-10 h-10 bg-gradient-to-r from-pink-500/20 to-primary-500/20 backdrop-blur-md rounded-xl flex items-center justify-center animate-float"
                      style={{ animationDelay: '1.5s' }}
                    >
                      <span className="text-gray-900 dark:text-white font-bold text-sm">
                        AI
                      </span>
                    </div>

                    {/* Status Text */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                      <div className="text-gray-900 dark:text-white font-semibold text-sm">
                        {portfolioData.personal.title}
                      </div>
                      <div className="text-gray-600 dark:text-gray-300 text-xs">
                        {portfolioData.personal.availability.message}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-blue-500/20 rounded-full blur-3xl scale-150 -z-10" />
                </div>
              </div>

              {/* Main Heading - Mobile */}
              <div className="text-center space-y-4 mb-8">
                <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                  <span className="text-gray-900 dark:text-white">
                    {(portfolioData.sections as any).hero.prefix}{' '}
                  </span>
                  <span className="bg-gradient-to-r from-primary-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
                    {(portfolioData.sections as any).hero.highlight}
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {' '}
                    {(portfolioData.sections as any).hero.suffix}
                  </span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {portfolioData.personal.title}{' '}
                  {(portfolioData.sections as any).hero.descriptionPrefix}{' '}
                  <span className="text-primary-400 font-semibold">
                    {portfolioData.stats.experience.value}
                  </span>{' '}
                  {(portfolioData.sections as any).hero.descriptionSuffix}
                </p>
              </div>

              {/* Stats - Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  {
                    number: portfolioData.stats.experience.value,
                    label: portfolioData.stats.experience.label,
                    icon: FaRocket,
                  },
                  {
                    number: portfolioData.stats.projects.value,
                    label: portfolioData.stats.projects.label,
                    icon: FaCode,
                  },
                  {
                    number: portfolioData.stats.technologies.value,
                    label: portfolioData.stats.technologies.label,
                    icon: FaLightbulb,
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-xl p-4 text-center hover:bg-white dark:hover:bg-white/10 transition-all duration-300 shadow-sm"
                  >
                    <stat.icon className="text-primary-400 text-2xl mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons - Mobile */}
              <div className="flex flex-col gap-4 mb-8">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="group bg-gradient-to-r from-primary-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-transform duration-300 flex items-center justify-center space-x-2"
                >
                  <FaRocket className="group-hover:animate-bounce-vertical" />
                  <span>{(portfolioData.sections as any).hero.ctaPrimary}</span>
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="group bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 text-gray-900 dark:text-white px-8 py-4 rounded-full font-semibold hover:bg-white dark:hover:bg-white/20 transition-colors duration-300 flex items-center justify-center space-x-2 shadow-sm"
                >
                  <FaEnvelope className="group-hover:animate-wiggle" />
                  <span>
                    {(portfolioData.sections as any).hero.ctaSecondary}
                  </span>
                </button>
              </div>

              {/* Social Links - Mobile */}
              <div className="flex justify-center space-x-4 mb-16">
                {portfolioData.contact.social
                  .filter((s) => s.platform !== 'Instagram')
                  .map((social, index) => {
                    const Icon = getSocialIcon(social.platform);
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 rounded-full flex items-center justify-center text-gray-900 dark:text-white hover:bg-white dark:hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-sm"
                        aria-label={social.platform}
                      >
                        <Icon />
                      </a>
                    );
                  })}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content - Desktop */}
              <div
                className={twMerge(
                  'space-y-8 transition-all duration-1000',
                  isVisible
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-10',
                )}
              >
                {/* Name - Left aligned on desktop */}
                <div className="text-left">
                  <h1
                    id="home-name-desktop"
                    className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3"
                  >
                    {portfolioData.personal.name}
                  </h1>
                  <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 rounded-full px-4 py-2 text-sm text-gray-900 dark:text-white shadow-sm">
                    <FaBrain className="text-primary-600 dark:text-primary-400" />
                    <span>{portfolioData.personal.subtitle}</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  </div>
                </div>

                <div className="space-y-4 text-left">
                  <h2 className="text-6xl lg:text-7xl font-bold leading-tight">
                    <span className="text-gray-900 dark:text-white">
                      {(portfolioData.sections as any).hero.prefix}
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-primary-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
                      {(portfolioData.sections as any).hero.highlight}
                    </span>
                    <br />
                    <span className="text-gray-900 dark:text-white">
                      {(portfolioData.sections as any).hero.suffix}
                    </span>
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg mx-0">
                    {portfolioData.personal.title}{' '}
                    {(portfolioData.sections as any).hero.descriptionPrefix}{' '}
                    <span className="text-primary-400 font-semibold">
                      {portfolioData.stats.experience.value}
                    </span>{' '}
                    {(portfolioData.sections as any).hero.descriptionSuffix}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  {[
                    {
                      number: portfolioData.stats.experience.value,
                      label: portfolioData.stats.experience.label,
                      icon: FaRocket,
                    },
                    {
                      number: portfolioData.stats.projects.value,
                      label: portfolioData.stats.projects.label,
                      icon: FaCode,
                    },
                    {
                      number: portfolioData.stats.technologies.value,
                      label: portfolioData.stats.technologies.label,
                      icon: FaLightbulb,
                    },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-xl p-4 text-center hover:bg-white dark:hover:bg-white/10 transition-all duration-300 shadow-sm"
                    >
                      <stat.icon className="text-primary-400 text-2xl mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="group bg-gradient-to-r from-primary-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-transform duration-300 flex items-center space-x-2 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <FaRocket className="group-hover:animate-bounce-vertical" />
                    <span>
                      {(portfolioData.sections as any).hero.ctaPrimary}
                    </span>
                  </button>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="group bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 text-gray-900 dark:text-white px-8 py-4 rounded-full font-semibold hover:bg-white dark:hover:bg-white/20 transition-colors duration-300 flex items-center space-x-2 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                  >
                    <FaEnvelope className="group-hover:animate-wiggle" />
                    <span>
                      {(portfolioData.sections as any).hero.ctaSecondary}
                    </span>
                  </button>
                </div>

                <div className="flex space-x-4">
                  {portfolioData.contact.social
                    .filter((s) => s.platform !== 'Instagram')
                    .map((social, index) => {
                      const Icon = getSocialIcon(social.platform);
                      return (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 rounded-full flex items-center justify-center text-gray-900 dark:text-white hover:bg-white dark:hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-sm"
                          aria-label={social.platform}
                        >
                          <Icon />
                        </a>
                      );
                    })}
                </div>
              </div>

              {/* Right Content - Desktop with mouse animation */}
              <div
                className={twMerge(
                  'relative transition-all duration-1000 delay-300',
                  isVisible
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-10',
                )}
              >
                <div className="relative">
                  <div
                    className="relative w-96 h-96 mx-auto"
                    style={{
                      transform: `perspective(1000px) rotateY(${mousePosition.x * 0.01}deg) rotateX(${-mousePosition.y * 0.01}deg)`,
                    }}
                  >
                    <div className="absolute inset-0 bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-6">
                        <div className="relative">
                          <img
                            src={portfolioData.personal.profileImage}
                            alt={portfolioData.personal.name}
                            className="w-32 h-32 rounded-2xl object-cover border-4 border-gray-200 dark:border-white/30"
                          />
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                          </div>
                        </div>
                      </div>

                      <div className="absolute top-20 left-8 w-12 h-12 bg-gradient-to-r from-primary-500/20 to-blue-500/20 backdrop-blur-md rounded-xl flex items-center justify-center animate-float">
                        <span className="text-gray-900 dark:text-white font-bold">
                          TS
                        </span>
                      </div>
                      <div
                        className="absolute top-32 right-8 w-12 h-12 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md rounded-xl flex items-center justify-center animate-float"
                        style={{ animationDelay: '0.5s' }}
                      >
                        <span className="text-gray-900 dark:text-white font-bold">
                          ⚛️
                        </span>
                      </div>
                      <div
                        className="absolute bottom-32 left-12 w-12 h-12 bg-gradient-to-r from-green-500/20 to-teal-500/20 backdrop-blur-md rounded-xl flex items-center justify-center animate-float"
                        style={{ animationDelay: '1s' }}
                      >
                        <span className="text-gray-900 dark:text-white font-bold">
                          🚀
                        </span>
                      </div>
                      <div
                        className="absolute bottom-20 right-12 w-12 h-12 bg-gradient-to-r from-pink-500/20 to-primary-500/20 backdrop-blur-md rounded-xl flex items-center justify-center animate-float"
                        style={{ animationDelay: '1.5s' }}
                      >
                        <span className="text-gray-900 dark:text-white font-bold">
                          AI
                        </span>
                      </div>

                      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                        <div className="text-gray-900 dark:text-white font-semibold">
                          {portfolioData.personal.title}
                        </div>
                        <div className="text-gray-600 dark:text-gray-300 text-sm">
                          {portfolioData.personal.availability.message}
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 animate-spin-slow">
                      <div className="absolute top-0 left-1/2 w-4 h-4 bg-primary-500 rounded-full transform -translate-x-1/2 -translate-y-8" />
                      <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2 translate-y-8" />
                      <div className="absolute left-0 top-1/2 w-4 h-4 bg-pink-500 rounded-full transform -translate-x-8 -translate-y-1/2" />
                      <div className="absolute right-0 top-1/2 w-4 h-4 bg-cyan-500 rounded-full transform translate-x-8 -translate-y-1/2" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-blue-500/20 rounded-full blur-3xl scale-150 -z-10" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        <div className="hidden lg:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center space-y-2 text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
          >
            <span className="text-sm">Scroll to explore</span>
            <FaChevronDown className="animate-pulse" />
          </button>
        </div>

        {/* Custom Styles */}
        <style jsx>{`
          @keyframes gradient-x {
            0%,
            100% {
              background-size: 200% 200%;
              background-position: left center;
            }
            50% {
              background-size: 200% 200%;
              background-position: right center;
            }
          }

          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          .animate-gradient-x {
            animation: gradient-x 3s ease infinite;
          }

          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
        `}</style>
      </div>
    </>
  );
};

export default HomePage;
