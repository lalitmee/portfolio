import React from 'react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'John Doe',
      role: 'Tech Lead at XYZ Corp',
      content:
        'Lalit is an exceptional developer with deep knowledge in frontend and backend technologies. His work on our CI/CD pipelines saved us countless hours.',
    },
    {
      name: 'Jane Smith',
      role: 'Marketing Director at ABC Inc',
      content:
        'His expertise in digital marketing tools helped us optimize our campaigns effectively. Highly recommend for any tech and marketing projects.',
    },
    {
      name: 'Mike Johnson',
      role: 'CTO at Startup Co',
      content:
        "Lalit's cloud architecture skills on AWS and GCP are top-notch. He delivered scalable solutions that met all our requirements.",
    },
  ];

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
