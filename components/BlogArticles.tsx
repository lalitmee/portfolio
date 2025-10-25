import React from 'react';

const BlogArticles: React.FC = () => {
  const articles = [
    {
      title: 'Optimizing React Apps for Performance',
      date: '2023-10-01',
      link: '#',
      excerpt: 'Tips and tricks for improving React application performance.',
    },
    {
      title: 'Introduction to CI/CD with GitHub Actions',
      date: '2023-09-15',
      link: '#',
      excerpt: 'Setting up automated pipelines for your projects.',
    },
    {
      title: 'Digital Marketing Strategies for Developers',
      date: '2023-08-20',
      link: '#',
      excerpt: 'How to leverage SEO and ads for personal branding.',
    },
  ];

  return (
    <section className="py-16 bg-gray-50" id="blog">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Blog & Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{article.date}</p>
              <p className="text-gray-600 mb-4">{article.excerpt}</p>
              <a
                href={article.link}
                className="text-blue-600 hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogArticles;
