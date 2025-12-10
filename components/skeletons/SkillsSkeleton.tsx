import React from 'react';

const SkillsSkeleton: React.FC = () => {
  return (
    <section className="py-20 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 mb-6">
            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
            <div className="w-20 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
          </div>

          <div className="h-10 sm:h-14 w-3/4 sm:w-1/2 mx-auto bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse mb-6" />
          <div className="h-6 w-full max-w-2xl mx-auto bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        </div>

        {/* Stats Section Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-6 h-40 flex flex-col items-center justify-center animate-pulse"
            >
              <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4" />
              <div className="w-16 h-8 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
              <div className="w-24 h-4 bg-gray-200 dark:bg-gray-800 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSkeleton;
