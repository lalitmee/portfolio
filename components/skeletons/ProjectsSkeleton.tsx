import React from 'react';

const ProjectsSkeleton: React.FC = () => {
  return (
    <section className="py-20 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 mb-6">
            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
            <div className="w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
          </div>

          <div className="h-10 sm:h-14 w-3/4 sm:w-1/2 mx-auto bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse mb-6" />
          <div className="h-6 w-full max-w-2xl mx-auto bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        </div>

        {/* Category Tabs Skeleton */}
        <div className="flex justify-center mb-16 px-6">
          {/* Mobile Dropdown Skeleton */}
          <div className="md:hidden w-full max-w-sm h-14 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />

          {/* Desktop Tabs Skeleton */}
          <div className="hidden md:inline-flex flex-wrap justify-center gap-2 bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-full p-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-24 h-10 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Projects Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg h-full flex flex-col"
            >
              {/* Image Skeleton */}
              <div className="relative h-48 bg-gray-200 dark:bg-gray-700 animate-pulse">
                <div className="absolute top-4 left-4 w-20 h-6 bg-gray-300 dark:bg-gray-600 rounded-full" />
              </div>

              {/* Content Skeleton */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-3/4 h-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="flex space-x-2">
                    <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
                    <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
                  </div>
                </div>

                <div className="space-y-2 mb-6 flex-grow">
                  <div className="w-full h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                  <div className="w-full h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                  <div className="w-2/3 h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                </div>

                {/* Tech Tags Skeleton */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {[1, 2, 3, 4].map((t) => (
                    <div
                      key={t}
                      className="w-16 h-6 bg-gray-100 dark:bg-gray-700 rounded-full animate-pulse"
                    />
                  ))}
                </div>

                {/* Buttons Skeleton */}
                <div className="flex space-x-2 mt-auto">
                  <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                  <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSkeleton;
