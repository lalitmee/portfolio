import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

interface Quote {
  quote: string;
  author: string;
}

const Quotes: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

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

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
  };

  const nextQuote = () => {
    setDirection(1);
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setDirection(-1);
    setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  // Auto-rotate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <section
      id="quotes"
      className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 transition-colors duration-500"
    >
      <div className="max-w-4xl mx-auto px-6 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Words of{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Wisdom
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Inspiration from great minds in technology and beyond
          </p>
        </div>

        <div
          className={twMerge(
            'relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 transition-all duration-500 min-h-[350px] flex flex-col',
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
          )}
        >
          {/* Quote Icon */}
          <div className="absolute top-6 left-6 text-4xl text-purple-500/20 z-0">
            <FaQuoteLeft />
          </div>

          {/* Navigation Buttons (Outside Content Clipper, Inside Card for positioning) */}
          <button
            onClick={prevQuote}
            className="absolute left-0 md:-left-5 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-800 hover:text-purple-600 dark:hover:text-purple-400 shadow-lg transition-all duration-300 z-30 flex items-center justify-center border border-gray-100 dark:border-gray-600"
            aria-label="Previous quote"
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextQuote}
            className="absolute right-0 md:-right-5 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-800 hover:text-purple-600 dark:hover:text-purple-400 shadow-lg transition-all duration-300 z-30 flex items-center justify-center border border-gray-100 dark:border-gray-600"
            aria-label="Next quote"
          >
            <FaChevronRight className="w-5 h-5" />
          </button>

          {/* Content Clipper */}
          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentQuote}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center px-4"
              >
                <div className="text-center w-full max-w-3xl">
                  <blockquote className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white leading-relaxed mb-6">
                    "{quotes[currentQuote].quote}"
                  </blockquote>

                  <div className="flex flex-col items-center">
                    <cite className="text-lg font-semibold text-purple-600 dark:text-purple-400 not-italic">
                      — {quotes[currentQuote].author}
                    </cite>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Quote Indicators (Bottom Center) - Absolute relative to card */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-20">
            {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentQuote ? 1 : -1);
                  setCurrentQuote(index);
                }}
                className={twMerge(
                  'h-2 rounded-full transition-all duration-300 ease-in-out',
                  index === currentQuote
                    ? 'w-6 bg-purple-600'
                    : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-purple-400',
                )}
                aria-label={`Go to quote ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Quote Counter removed as per design request for cleaner look, or we can keep it if user implies. Request said "lets show only dots at the bottom" so assuming removing counter text. */}
      </div>
    </section>
  );
};

export default Quotes;
