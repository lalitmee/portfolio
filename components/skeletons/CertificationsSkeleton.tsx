import React from 'react';

const CertificationsSkeleton: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-black/20" id="certifications">
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-10 w-64 mx-auto bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-gray-50 dark:bg-white/5 p-6 rounded-lg shadow h-48 flex flex-col justify-between"
            >
              <div>
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                <div className="h-3 w-1/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
              </div>
              <div className="h-4 w-1/4 bg-blue-100 dark:bg-blue-900/30 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSkeleton;
