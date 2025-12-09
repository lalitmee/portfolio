import React from 'react';

import portfolioData from '../data/portfolio.json';

const Testimonials: React.FC = () => {
  const testimonials = portfolioData.testimonials;

  return (
    <section className="py-16 bg-gray-50" id="testimonials">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <p className="text-gray-600 mb-4 italic">
                "{testimonial.content}"
              </p>
              <div className="text-right">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
