import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

interface Quote {
  id: number;
  text: string;
  author: string;
  context?: string;
}

const Quotes: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
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
      id: 1,
      text: 'The best way to predict the future is to create it.',
      author: 'Peter Drucker',
      context: 'Management Consultant',
    },
    {
      id: 2,
      text: "Code is like humor. When you have to explain it, it's bad.",
      author: 'Cory House',
      context: 'Software Developer',
    },
    {
      id: 3,
      text: 'First, solve the problem. Then, write the code.',
      author: 'John Johnson',
      context: 'Software Engineer',
    },
    {
      id: 4,
      text: 'The most important property of a program is whether it accomplishes the intention of its user.',
      author: 'C.A.R. Hoare',
      context: 'Computer Scientist',
    },
    {
      id: 5,
      text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      author: 'Martin Fowler',
      context: 'Software Developer',
    },
    {
      id: 6,
      text: 'Experience is the name everyone gives to their mistakes.',
      author: 'Oscar Wilde',
      context: 'Writer',
    },
  ];

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  // Auto-rotate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <section
      id="quotes"
      className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 transition-colors duration-500"
    >
      <div className="max-w-4xl mx-auto px-6">
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
            'relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 transition-all duration-500',
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
          )}
        >
          {/* Quote Icon */}
          <div className="absolute top-6 left-6 text-4xl text-purple-500/20">
            <FaQuoteLeft />
          </div>

          {/* Quote Content */}
          <div className="relative z-10 text-center">
            <blockquote className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white leading-relaxed mb-6">
              "{quotes[currentQuote].text}"
            </blockquote>

            <div className="flex flex-col items-center space-y-2">
              <cite className="text-lg font-semibold text-purple-600 dark:text-purple-400 not-italic">
                — {quotes[currentQuote].author}
              </cite>
              {quotes[currentQuote].context && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {quotes[currentQuote].context}
                </span>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prevQuote}
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300"
              aria-label="Previous quote"
            >
              <FaChevronLeft />
            </button>

            {/* Quote Indicators */}
            <div className="flex space-x-2">
              {quotes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuote(index)}
                  className={twMerge(
                    'w-3 h-3 rounded-full transition-all duration-300',
                    index === currentQuote
                      ? 'bg-purple-600 scale-125'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-purple-400',
                  )}
                  aria-label={`Go to quote ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextQuote}
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300"
              aria-label="Next quote"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
            <div
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-1 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuote + 1) / quotes.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Quote Counter */}
        <div className="text-center mt-6">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {currentQuote + 1} of {quotes.length}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Quotes;
