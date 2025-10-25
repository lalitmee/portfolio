import React, { useEffect, useState } from 'react';
import {
  FaAward,
  FaAws,
  FaChartLine,
  FaDatabase,
  FaDocker,
  FaExternalLinkAlt,
  FaGithub,
  FaMobile,
  FaNodeJs,
  FaPython,
  FaReact,
  FaRocket,
  FaUsers,
} from 'react-icons/fa';
import {
  SiKubernetes,
  SiMongodb,
  SiNextdotjs,
  SiPostgresql,
  SiTypescript,
} from 'react-icons/si';
import { twMerge } from 'tailwind-merge';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: 'Enterprise' | 'SaaS' | 'E-commerce' | 'Mobile' | 'Open Source';
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  metrics: {
    users?: string;
    performance?: string;
    revenue?: string;
    teamSize?: string;
  };
  highlights: string[];
  year: string;
  status: 'Completed' | 'In Progress' | 'Maintained';
}

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    const element = document.getElementById('projects');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Enterprise Dashboard Platform',
      description:
        'Comprehensive analytics dashboard for enterprise clients with real-time data visualization',
      longDescription:
        'Led the development of a comprehensive enterprise dashboard platform that processes over 10M data points daily. The platform provides real-time analytics, custom reporting, and advanced data visualization capabilities for Fortune 500 companies.',
      technologies: [
        'React',
        'TypeScript',
        'Node.js',
        'PostgreSQL',
        'Redis',
        'AWS',
        'Docker',
      ],
      category: 'Enterprise',
      image: '/images/projects/dashboard.jpg',
      githubUrl: 'https://github.com/lalitmee/enterprise-dashboard',
      liveUrl: 'https://dashboard.example.com',
      metrics: {
        users: '50K+ Active Users',
        performance: '99.9% Uptime',
        revenue: '$2M+ ARR Impact',
        teamSize: '8 Developers',
      },
      highlights: [
        'Reduced data processing time by 70%',
        'Implemented real-time WebSocket connections',
        'Built scalable microservices architecture',
        'Led team of 8 developers across 3 time zones',
      ],
      year: '2023',
      status: 'Maintained',
    },
    {
      id: 2,
      title: 'E-commerce Marketplace',
      description:
        'Multi-vendor e-commerce platform with advanced search and recommendation engine',
      longDescription:
        'Architected and developed a multi-vendor e-commerce marketplace from scratch, handling complex vendor management, payment processing, and order fulfillment workflows. Implemented ML-powered recommendation system.',
      technologies: [
        'Next.js',
        'TypeScript',
        'Node.js',
        'MongoDB',
        'Stripe',
        'AWS',
        'Kubernetes',
      ],
      category: 'E-commerce',
      image: '/images/projects/ecommerce.jpg',
      githubUrl: 'https://github.com/lalitmee/ecommerce-platform',
      liveUrl: 'https://marketplace.example.com',
      metrics: {
        users: '100K+ Customers',
        performance: '2.3s Load Time',
        revenue: '$5M+ GMV',
        teamSize: '12 Developers',
      },
      highlights: [
        'Built from MVP to $5M+ GMV in 18 months',
        'Implemented AI-powered product recommendations',
        'Designed scalable payment processing system',
        'Achieved 40% increase in conversion rates',
      ],
      year: '2022',
      status: 'Completed',
    },
    {
      id: 3,
      title: 'SaaS Project Management Tool',
      description:
        'Collaborative project management platform with advanced team coordination features',
      longDescription:
        'Developed a comprehensive SaaS project management tool with real-time collaboration, advanced reporting, and integration capabilities. The platform serves teams ranging from startups to enterprise clients.',
      technologies: [
        'React',
        'TypeScript',
        'GraphQL',
        'PostgreSQL',
        'Redis',
        'Docker',
        'AWS',
      ],
      category: 'SaaS',
      image: '/images/projects/saas.jpg',
      githubUrl: 'https://github.com/lalitmee/project-management',
      liveUrl: 'https://projecttool.example.com',
      metrics: {
        users: '25K+ Teams',
        performance: '99.8% Uptime',
        revenue: '$1.5M+ ARR',
        teamSize: '6 Developers',
      },
      highlights: [
        'Achieved product-market fit in 12 months',
        'Built real-time collaboration features',
        'Implemented advanced permission system',
        'Integrated with 20+ third-party tools',
      ],
      year: '2023',
      status: 'In Progress',
    },
    {
      id: 4,
      title: 'Mobile Banking Application',
      description:
        'Secure mobile banking app with biometric authentication and real-time transactions',
      longDescription:
        'Led the development of a secure mobile banking application with advanced security features, biometric authentication, and real-time transaction processing. Ensured compliance with financial regulations.',
      technologies: [
        'React Native',
        'TypeScript',
        'Node.js',
        'PostgreSQL',
        'AWS',
        'Docker',
      ],
      category: 'Mobile',
      image: '/images/projects/mobile-banking.jpg',
      githubUrl: 'https://github.com/lalitmee/mobile-banking',
      metrics: {
        users: '200K+ Downloads',
        performance: '4.8/5 App Store',
        teamSize: '10 Developers',
      },
      highlights: [
        'Implemented biometric authentication',
        'Achieved bank-grade security standards',
        'Built real-time transaction processing',
        'Maintained 4.8/5 app store rating',
      ],
      year: '2021',
      status: 'Completed',
    },
    {
      id: 5,
      title: 'Open Source UI Library',
      description:
        'Comprehensive React component library with TypeScript support and extensive documentation',
      longDescription:
        'Created and maintain a popular open-source React component library with TypeScript support, comprehensive documentation, and extensive customization options. Used by 1000+ developers worldwide.',
      technologies: [
        'React',
        'TypeScript',
        'Storybook',
        'Rollup',
        'Jest',
        'GitHub Actions',
      ],
      category: 'Open Source',
      image: '/images/projects/ui-library.jpg',
      githubUrl: 'https://github.com/lalitmee/react-ui-library',
      liveUrl: 'https://ui-library.example.com',
      metrics: {
        users: '5K+ GitHub Stars',
        performance: '1K+ Weekly Downloads',
        teamSize: '15 Contributors',
      },
      highlights: [
        'Gained 5K+ GitHub stars in 2 years',
        'Built comprehensive component library',
        'Maintained 95%+ test coverage',
        'Active community of 15+ contributors',
      ],
      year: '2022',
      status: 'Maintained',
    },
  ];

  const categories = [
    'All',
    'Enterprise',
    'SaaS',
    'E-commerce',
    'Mobile',
    'Open Source',
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const getStatusClass = (status: string) => {
    if (status === 'Completed') return 'bg-green-500 text-white';
    if (status === 'In Progress') return 'bg-yellow-500 text-white';
    return 'bg-blue-500 text-white';
  };

  const getTechIcon = (tech: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      React: <FaReact className="text-blue-500" />,
      TypeScript: <SiTypescript className="text-blue-600" />,
      'Next.js': <SiNextdotjs className="text-black dark:text-white" />,
      'Node.js': <FaNodeJs className="text-green-600" />,
      Python: <FaPython className="text-yellow-500" />,
      MongoDB: <SiMongodb className="text-green-500" />,
      PostgreSQL: <SiPostgresql className="text-blue-700" />,
      AWS: <FaAws className="text-orange-500" />,
      Docker: <FaDocker className="text-blue-500" />,
      Kubernetes: <SiKubernetes className="text-blue-600" />,
    };
    return iconMap[tech] || <FaDatabase className="text-gray-500" />;
  };

  return (
    <section
      id="projects"
      className="py-20 bg-white dark:bg-gray-900 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Showcasing impactful projects that demonstrate technical excellence,
            leadership, and business value
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={twMerge(
                'px-6 py-3 rounded-full font-semibold transition-all duration-300',
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md',
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <button
              key={project.id}
              className={twMerge(
                'bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group cursor-pointer w-full text-left',
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4',
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setSelectedProject(project)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedProject(project);
                }
              }}
              aria-label={`View details for ${project.title}`}
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-purple-500 to-blue-600 overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 left-4">
                  <span
                    className={twMerge(
                      'px-3 py-1 rounded-full text-xs font-semibold',
                      getStatusClass(project.status),
                    )}
                  >
                    {project.status}
                  </span>
                </div>
                <div className="absolute top-4 right-4 text-white text-sm font-semibold">
                  {project.year}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl text-white/30">
                    {project.category === 'Enterprise' && <FaChartLine />}
                    {project.category === 'SaaS' && <FaRocket />}
                    {project.category === 'E-commerce' && <FaUsers />}
                    {project.category === 'Mobile' && <FaMobile />}
                    {project.category === 'Open Source' && <FaAward />}
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs"
                    >
                      {getTechIcon(tech)}
                      <span className="text-gray-700 dark:text-gray-300">
                        {tech}
                      </span>
                    </div>
                  ))}
                  {project.technologies.length > 4 && (
                    <div className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs text-gray-700 dark:text-gray-300">
                      +{project.technologies.length - 4} more
                    </div>
                  )}
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  {project.metrics.users && (
                    <div className="text-center bg-purple-50 dark:bg-purple-900/20 p-2 rounded">
                      <div className="font-semibold text-purple-600 dark:text-purple-400">
                        {project.metrics.users}
                      </div>
                    </div>
                  )}
                  {project.metrics.performance && (
                    <div className="text-center bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                      <div className="font-semibold text-blue-600 dark:text-blue-400">
                        {project.metrics.performance}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-900 dark:bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaGithub />
                      <span>Code</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaExternalLinkAlt />
                      <span>Live</span>
                    </a>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <button
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 cursor-default"
            onClick={() => setSelectedProject(null)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setSelectedProject(null);
              }
            }}
            aria-label="Close modal"
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              role="document"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedProject.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {selectedProject.category} • {selectedProject.year}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                  {selectedProject.longDescription}
                </p>

                {/* Metrics Grid */}
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  {Object.entries(selectedProject.metrics).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="text-center bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                      >
                        <div className="font-bold text-lg text-purple-600 dark:text-purple-400">
                          {value}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ),
                  )}
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full"
                      >
                        {getTechIcon(tech)}
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          {tech}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-900 dark:bg-gray-700 text-white py-3 px-6 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors flex items-center space-x-2"
                    >
                      <FaGithub />
                      <span>View Code</span>
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
                    >
                      <FaExternalLinkAlt />
                      <span>View Live</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </button>
        )}
      </div>
    </section>
  );
};

export default Projects;
