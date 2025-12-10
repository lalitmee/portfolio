import React from 'react';

const ResumeSkeleton: React.FC = () => {
  return (
    <section className="py-20 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 mb-6">
            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
            <div className="w-20 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
          </div>

          <div className="h-10 sm:h-14 w-3/4 sm:w-1/2 mx-auto bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse mb-8" />
          <div className="h-6 w-full max-w-2xl mx-auto bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-8" />

          <div className="w-48 h-12 mx-auto bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
        </div>

        {/* Tabs Skeleton */}
        <div className="flex justify-center mb-16 px-6">
          {/* Mobile Dropdown */}
          <div className="md:hidden w-full max-w-sm h-14 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />

          {/* Desktop Tabs */}
          <div className="hidden md:inline-flex flex-wrap justify-center gap-2 bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-full p-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-32 h-12 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Content Skeleton (Simulating Experience Timeline) */}
        <div className="relative min-h-[400px]">
          {/* Timeline Line (Desktop) */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800" />

          <div className="space-y-8 md:space-y-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative pl-0 md:pl-20">
                {/* Timeline Dot (Desktop) */}
                <div className="hidden md:block absolute left-6 w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse border-4 border-white dark:border-black" />

                {/* Card Skeleton */}
                <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-6 md:p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div className="space-y-3 flex-1">
                      <div className="w-48 h-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                      <div className="w-32 h-5 bg-primary-100 dark:bg-primary-900/30 rounded animate-pulse" />
                      <div className="flex gap-4">
                        <div className="w-24 h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                        <div className="w-32 h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                      </div>
                    </div>
                    {/* Date Badge */}
                    <div className="w-24 h-8 bg-green-100 dark:bg-green-900/20 rounded-full animate-pulse" />
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="w-full h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                    <div className="w-full h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                    <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                  </div>

                  {/* Achievements */}
                  <div className="mb-6">
                    <div className="w-40 h-5 bg-gray-300 dark:bg-gray-700 rounded mb-4 animate-pulse" />
                    <div className="space-y-3">
                      {[1, 2, 3].map((j) => (
                        <div key={j} className="flex items-center gap-3">
                          <div className="w-4 h-4 bg-green-200 dark:bg-green-900 rounded-full" />
                          <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((k) => (
                      <div
                        key={k}
                        className="w-20 h-8 bg-gray-100 dark:bg-gray-700/50 rounded-full animate-pulse"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSkeleton;
