import React from 'react';

const BlogArticlesSkeleton: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-black/10" id="blog">
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-10 w-48 mx-auto bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-white/5 p-6 rounded-lg shadow h-56 flex flex-col"
            >
              <div className="h-6 w-11/12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
              <div className="h-3 w-1/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
              <div className="space-y-2 mb-4 flex-grow">
                <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
              </div>
              <div className="h-4 w-20 bg-blue-100 dark:bg-blue-900/30 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogArticlesSkeleton;
