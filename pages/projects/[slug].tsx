import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import NextImage from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import {
  FaArrowLeft,
  FaAward,
  FaChartLine,
  FaCode,
  FaCodeBranch,
  FaExternalLinkAlt,
  FaGithub,
  FaMobile,
  FaRocket,
  FaStar,
  FaUsers,
} from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';
import Navigation from '../../components/Navigation';
import GlassButton from '../../components/ui/GlassButton';
import portfolioData from '../../data/portfolio.json';
import { generateSlug } from '../../utils/slug';
import { getTechIcon } from '../../utils/techIcons';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  image: string;
  github?: string;
  demo?: string;
  highlights: string[];
  status: string;
  featured?: boolean;
  stars?: number;
  forks?: number;
}

interface ProjectDetailProps {
  project: Project;
}

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Live':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800';
    case 'In Development':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800';
    case 'Prototype':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-200 dark:border-purple-800';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300 border border-gray-200 dark:border-gray-700';
  }
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Navigation showBackArrow={true} />
      <Head>
        <title>{project.title} | Project Details</title>
        <meta name="description" content={project.description} />
      </Head>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="inline-block">
            <GlassButton
              onClick={() => {
                if (window.history.length > 2) {
                  router.back();
                } else {
                  router.push('/#projects');
                }
              }}
              icon={<FaArrowLeft />}
            >
              Back to Projects
            </GlassButton>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
          {/* Hero Section */}
          <div className="relative h-64 md:h-96 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-blue-600" />
            {project.image && (
              <NextImage
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute top-6 left-6 z-10">
              <span
                className={twMerge(
                  'px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md',
                  getStatusClass(project.status),
                )}
              >
                {project.status}
              </span>
            </div>

            {!project.image && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-9xl text-white/20">
                  {project.category === 'Enterprise' && <FaChartLine />}
                  {project.category === 'SaaS' && <FaRocket />}
                  {project.category === 'E-commerce' && <FaUsers />}
                  {project.category === 'Mobile' && <FaMobile />}
                  {project.category === 'Open Source' && <FaAward />}
                  {project.category === 'Frontend' && <FaCode />}
                  {project.category === 'Featured' && <FaAward />}
                  {project.category.includes('Nanodegree') && <FaCode />}
                </div>
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent z-10">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {project.title}
              </h1>
              <p className="text-xl text-gray-200">{project.category}</p>
            </div>
          </div>

          <div className="p-8">
            {/* Stats */}
            {((project.stars !== undefined && project.stars > 0) ||
              (project.forks !== undefined && project.forks > 0)) && (
              <div className="flex space-x-6 mb-8 text-gray-600 dark:text-gray-400">
                {project.stars !== undefined && project.stars > 0 && (
                  <div className="flex items-center space-x-2">
                    <FaStar className="text-yellow-400 text-xl" />
                    <span className="text-lg">{project.stars} Stars</span>
                  </div>
                )}
                {project.forks !== undefined && project.forks > 0 && (
                  <div className="flex items-center space-x-2">
                    <FaCodeBranch className="text-blue-400 text-xl" />
                    <span className="text-lg">{project.forks} Forks</span>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">About the Project</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Key Achievements</h2>
              <ul className="space-y-3">
                {project.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1.5 text-lg">✓</span>
                    <span className="text-lg text-gray-600 dark:text-gray-300">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
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

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-900 dark:bg-gray-700 text-white py-4 px-6 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-600 transition-all flex items-center justify-center space-x-3 text-lg font-semibold"
                >
                  <FaGithub className="text-2xl" />
                  <span>View Source Code</span>
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-primary-600 to-blue-600 text-white py-4 px-6 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center space-x-3 text-lg font-semibold"
                >
                  <FaExternalLinkAlt className="text-xl" />
                  <span>View Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = portfolioData.projects.map((project) => ({
    params: { slug: generateSlug(project.title) },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const project = portfolioData.projects.find(
    (p) => generateSlug(p.title) === slug,
  );

  if (!project) {
    return { notFound: true };
  }

  return {
    props: {
      project,
    },
  };
};

export default ProjectDetail;
