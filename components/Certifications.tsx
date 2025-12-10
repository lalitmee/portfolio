import React from 'react';
import portfolioData from '../data/portfolio.json';

const Certifications: React.FC = () => {
  return (
    <section className="py-16 bg-white" id="certifications">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          {(portfolioData.sections as any).certifications.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {portfolioData.certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{cert.name}</h3>
              <p className="text-gray-600 mb-1">{cert.issuer}</p>
              <p className="text-sm text-gray-500 mb-4">{cert.date}</p>
              <a
                href={cert.link}
                className="text-blue-600 hover:text-blue-800 text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                {(portfolioData.sections as any).certifications.linkText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
