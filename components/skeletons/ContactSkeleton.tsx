import React from 'react';

const ContactSkeleton: React.FC = () => {
  return (
    <section className="py-20 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <div className="h-10 sm:h-14 w-3/4 sm:w-1/2 mx-auto bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse mb-4" />
          <div className="h-6 w-full max-w-2xl mx-auto bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info Skeleton */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-6 mx-auto lg:mx-0" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
              </div>
            </div>

            {/* Contact Details Skeleton */}
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center space-x-4 p-4 bg-white/80 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links Skeleton */}
            <div className="text-center lg:text-left">
              <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-4 mx-auto lg:mx-0" />
              <div className="flex justify-center lg:justify-start space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-12 w-12 bg-white/80 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 animate-pulse"
                  />
                ))}
              </div>
            </div>

            {/* Availability Skeleton */}
            <div className="h-24 bg-gray-100 dark:bg-gray-800/50 rounded-xl animate-pulse" />
          </div>

          {/* Contact Form Skeleton */}
          <div>
            <div className="bg-white/80 dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-6" />

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {[1, 2].map((i) => (
                    <div key={i}>
                      <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-2" />
                      <div className="h-12 w-full bg-gray-50 dark:bg-gray-700 rounded-lg animate-pulse" />
                    </div>
                  ))}
                </div>

                {[3, 4].map((i) => (
                  <div key={i}>
                    <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-2" />
                    <div className="h-12 w-full bg-gray-50 dark:bg-gray-700 rounded-lg animate-pulse" />
                  </div>
                ))}

                <div>
                  <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-2" />
                  <div className="h-32 w-full bg-gray-50 dark:bg-gray-700 rounded-lg animate-pulse" />
                </div>

                <div className="h-14 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSkeleton;
