import React from 'react';

const DigitalMarketingProjects: React.FC = () => {
  const projects = [
    {
      title: 'E-commerce SEO Optimization',
      description:
        'Improved search rankings and organic traffic by 40% using Google Search Console and SEO best practices.',
      tools: ['Google Search Console', 'Google Analytics', 'Ahrefs'],
    },
    {
      title: 'PPC Campaign Management',
      description:
        'Managed Google Ads and Meta Ads campaigns, achieving 25% higher ROI through targeted advertising.',
      tools: ['Google Ads', 'Meta Ads Manager', 'Google Tag Manager'],
    },
    {
      title: 'Content Marketing Dashboard',
      description:
        'Built a dashboard for tracking content performance and audience engagement metrics.',
      tools: ['Google Data Studio', 'SEO tools', 'Social Media APIs'],
    },
  ];

  return (
    <section className="py-16 bg-white" id="digital-marketing">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Digital Marketing Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Tools Used:
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {project.tools.map((tool, i) => (
                    <li key={i}>{tool}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DigitalMarketingProjects;
