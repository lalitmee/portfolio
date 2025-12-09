import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import NextImage from 'next/image';
import Link from 'next/link';
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
import {
  SiAmazon,
  SiDocker,
  SiGraphql,
  SiJavascript,
  SiKubernetes,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiStorybook,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import { twMerge } from 'tailwind-merge';
import portfolioData from '../../data/portfolio.json';
import { generateSlug } from '../../utils/slug';

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

const getTechIcon = (tech: string) => {
  switch (tech.toLowerCase()) {
    case 'react':
    case 'react native':
    case 'react.js':
      return <SiReact className="text-blue-400" />;
    case 'typescript':
      return <SiTypescript className="text-blue-600" />;
    case 'javascript':
      return <SiJavascript className="text-yellow-400" />;
    case 'node.js':
      return <SiNodedotjs className="text-green-500" />;
    case 'next.js':
      return <SiNextdotjs className="text-white" />;
    case 'postgresql':
      return <SiPostgresql className="text-blue-300" />;
    case 'mongodb':
      return <SiMongodb className="text-green-400" />;
    case 'redis':
      return <SiRedis className="text-red-500" />;
    case 'docker':
      return <SiDocker className="text-blue-500" />;
    case 'kubernetes':
      return <SiKubernetes className="text-blue-400" />;
    case 'aws':
      return <SiAmazon className="text-orange-400" />;
    case 'graphql':
      return <SiGraphql className="text-pink-500" />;
    case 'python':
      return <SiPython className="text-blue-300" />;
    case 'stripe':
      return <SiStripe className="text-purple-400" />;
    case 'storybook':
      return <SiStorybook className="text-pink-500" />;
    case 'tailwindcss':
      return <SiTailwindcss className="text-cyan-400" />;
    default:
      return <FaCode className="text-gray-400" />;
  }
};

const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-green-500/20 text-green-400 border border-green-500/30';
    case 'in progress':
      return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
    case 'maintained':
    case 'active':
      return 'bg-purple-500/20 text-purple-400 border border-purple-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
  }
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Head>
        <title>{project.title} | Project Details</title>
        <meta name="description" content={project.description} />
      </Head>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/#projects"
          className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-500 mb-8 transition-colors"
        >
          <FaArrowLeft />
          <span>Back to Projects</span>
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
          {/* Hero Section */}
          <div className="relative h-64 md:h-96 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-600" />
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
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center space-x-3 text-lg font-semibold"
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
