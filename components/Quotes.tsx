import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

interface Quote {
  quote: string;
  author: string;
}

const Quotes: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    const element = document.getElementById('quotes');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const quotes: Quote[] = [
    {
      quote: 'The best error message is the one that never shows up.',
      author: 'Thomas Fuchs',
    },
    {
      quote: 'Code is like humor. When you have to explain it, it’s bad.',
      author: 'Cory House',
    },
    {
      quote:
        'UNIX is simple. It just takes a genius to understand its simplicity.',
      author: 'Dennis M. Ritchie',
    },
    {
      quote:
        'Formal education will make you a living. Self-education will make you a fortune.',
      author: 'Jim Rohn',
    },
    {
      quote:
        'Programming is not easy like Sunday morning, it is silent poetry.',
      author: 'Waseem Latif',
    },
    {
      quote: "Software being 'Done' is like lawn being 'Mowed'.",
      author: 'Jim Benson',
    },
    {
      quote:
        '90% of the functionality delivered now is better than 100% delivered never.',
      author: 'Brian W. Kernighan & P. J. Plaugher',
    },
    {
      quote: 'A good API is not just easy to use but also hard to misuse.',
      author: 'Jbd',
    },
    {
      quote: 'Hardware eventually fails. Software eventually works.',
      author: 'Michael Hurting',
    },
    {
      quote:
        'That which optimizes one part of the system necessarily undermines the system as a whole.',
      author: 'Eric Ries',
    },
    {
      quote:
        "These days, the problem isn't how to innovate; it's how to get society to adopt the good ideas that already exist.",
      author: 'Douglas Engelbart',
    },
    {
      quote:
        'Teams are immutable. Every time someone leaves, or joins, you have a new team, not a changed team.',
      author: 'Richard Dalton',
    },
    {
      quote:
        'What one programmer can do in one month, two programmers can do in two months.',
      author: 'Frederick P. Brooks',
    },
    {
      quote:
        'Treat your code like poetry and take it to the edge of the bare minimum.',
      author: 'Ilyo',
    },
    {
      quote: 'Things that are impossible just take longer.',
      author: 'Ian Hickson',
    },
    {
      quote: 'No code is faster than no code.',
      author: 'Merb Motto',
    },
    {
      quote:
        'Good engineers make solutions obsolete. Great engineers make themselves obsolete.',
      author: 'Jordan W',
    },
    {
      quote:
        'A program is like a poem: you cannot write a poem without writing it.',
      author: 'E. W. Dijkstra',
    },
    {
      quote: 'Blame the implementation, not the technique.',
      author: 'Tim Kadlec',
    },
    {
      quote:
        ' Simplicity is about subtracting the obvious and adding the meaningful. ',
      author: 'John Maeda',
    },
  ];

  const nextQuote = useCallback(() => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  }, [quotes.length]);

  const prevQuote = useCallback(() => {
    setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
  }, [quotes.length]);

  // Auto-rotate quotes
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      nextQuote();
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, nextQuote]);

  // Logic to determine style for stacked cards
  const getCardStyle = (index: number) => {
    // Calculate distance accounting for wrap-around
    const total = quotes.length;
    let distance = (index - currentQuote + total) % total;

    // Normalize distance to be between -total/2 and total/2
    if (distance > total / 2) distance -= total;

    // We only show a few cards
    const isActive = distance === 0;
    const isPrev = distance === -1;
    const isNext = distance === 1;
    const isPrev2 = distance === -2;
    const isNext2 = distance === 2;

    // Default hidden style
    let style = {
      x: '0%',
      scale: 0.8,
      opacity: 0,
      zIndex: 0,
      display: 'none',
      rotateY: 0,
    };

    if (isActive) {
      style = {
        x: '0%',
        scale: 1,
        opacity: 1,
        zIndex: 30,
        display: 'block',
        rotateY: 0,
      };
    } else if (isPrev) {
      style = {
        x: '-10%', // Reduced offset for mobile stacking
        scale: 0.9,
        opacity: 0.6,
        zIndex: 20,
        display: 'block',
        rotateY: 5,
      };
    } else if (isNext) {
      style = {
        x: '10%', // Reduced offset
        scale: 0.9,
        opacity: 0.6,
        zIndex: 20,
        display: 'block',
        rotateY: -5,
      };
    } else if (isPrev2) {
      style = {
        x: '-20%',
        scale: 0.8,
        opacity: 0.3,
        zIndex: 10,
        display: 'block',
        rotateY: 10,
      };
    } else if (isNext2) {
      style = {
        x: '20%',
        scale: 0.8,
        opacity: 0.3,
        zIndex: 10,
        display: 'block',
        rotateY: -10,
      };
    }

    return style;
  };

  // Adjust styles for larger screens if needed
  const getDesktopOverride = (index: number) => {
    const total = quotes.length;
    let distance = (index - currentQuote + total) % total;
    if (distance > total / 2) distance -= total;

    const isPrev = distance === -1;
    const isNext = distance === 1;
    const isPrev2 = distance === -2;
    const isNext2 = distance === 2;

    // Expand spacing on desktop
    if (isPrev) return { x: '-25%' };
    if (isNext) return { x: '25%' };
    if (isPrev2) return { x: '-45%' };
    if (isNext2) return { x: '45%' };

    return {};
  };

  return (
    <section
      id="quotes"
      className="py-20 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 relative flex flex-col items-center">
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Words of{' '}
            <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
              Wisdom
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Inspiration from great minds in technology and beyond
          </p>
        </div>

        <div
          className={twMerge(
            'relative w-full h-[320px] md:h-[360px] flex items-center justify-center perspective-1000',
            isVisible ? 'opacity-100' : 'opacity-0',
          )}
          style={{ perspective: '1000px' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Cards Container */}
          <div className="relative w-full max-w-md md:max-w-2xl h-full flex items-center justify-center">
            {quotes.map((quote, index) => {
              const baseStyle = getCardStyle(index);

              return (
                <motion.div
                  key={index}
                  className="absolute w-full md:w-[600px] h-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12 flex flex-col justify-center border border-gray-100 dark:border-gray-700 cursor-grab active:cursor-grabbing"
                  initial={false}
                  animate={{
                    x: baseStyle.x,
                    scale: baseStyle.scale,
                    opacity: baseStyle.opacity,
                    zIndex: baseStyle.zIndex,
                    display: baseStyle.display as any,
                    rotateY: baseStyle.rotateY,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 20,
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) * velocity.x;
                    if (swipe < -10000 || offset.x < -100) {
                      nextQuote();
                    } else if (swipe > 10000 || offset.x > 100) {
                      prevQuote();
                    }
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Watermark */}
                  <div className="absolute -bottom-4 -right-4 text-9xl text-primary-100 dark:text-gray-700/30 font-black opacity-50 select-none pointer-events-none z-0 transform -rotate-12">
                    &#10077;
                  </div>

                  {/* Quote Icon */}
                  <div className="text-4xl text-primary-500/40 relative z-10 flex justify-center mb-4">
                    <FaQuoteLeft />
                  </div>

                  <div className="relative z-10 flex items-center justify-center">
                    <blockquote className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white leading-relaxed text-center">
                      "{quote.quote}"
                    </blockquote>
                  </div>

                  <div className="relative z-10 text-center mt-6">
                    <cite className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600 not-italic">
                      — {quote.author}
                    </cite>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Arrows - Hidden on mobile */}
          <button
            onClick={prevQuote}
            className="hidden md:flex absolute left-4 lg:left-0 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400 shadow-lg transition-all duration-300 z-40 border border-gray-100 dark:border-gray-600 group"
            aria-label="Previous quote"
          >
            <FaChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>

          <button
            onClick={nextQuote}
            className="hidden md:flex absolute right-4 lg:right-0 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400 shadow-lg transition-all duration-300 z-40 border border-gray-100 dark:border-gray-600 group"
            aria-label="Next quote"
          >
            <FaChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Quotes;
