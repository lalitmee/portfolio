import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import {
  FaAward,
  FaChartLine,
  FaChevronDown,
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
import { useInView } from 'react-intersection-observer';
import { twMerge } from 'tailwind-merge';
import { generateSlug } from '../utils/slug';

import portfolioData from '../data/portfolio.json';

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

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [ref, isVisible] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [projectsWithStats, setProjectsWithStats] = useState<Project[]>([]);
  const [tabStyle, setTabStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const updatedProjects = await Promise.all(
          (portfolioData.projects as Project[]).map(async (project) => {
            if (project.github) {
              try {
                const repoPath = project.github.replace(
                  'https://github.com/',
                  '',
                );
                // Add a small delay to avoid rate limiting if there are many projects
                await new Promise((resolve) =>
                  setTimeout(resolve, Math.random() * 1000),
                );

                const response = await fetch(
                  `https://api.github.com/repos/${repoPath}`,
                );
                if (response.ok) {
                  const data = await response.json();
                  return {
                    ...project,
                    stars: data.stargazers_count,
                    forks: data.forks_count,
                  };
                }
              } catch (error) {
                console.warn(
                  `Error fetching stats for ${project.title}:`,
                  error,
                );
              }
            }
            return project;
          }),
        );
        setProjectsWithStats(updatedProjects);
      } catch (error) {
        console.error('Failed to fetch project stats', error);
        // Fallback to default data
        setProjectsWithStats(portfolioData.projects as Project[]);
      }
    };

    fetchStats();
  }, []);

  const projects =
    projectsWithStats.length > 0
      ? projectsWithStats
      : (portfolioData.projects as Project[]);

  const categories = [
    'All',
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  useEffect(() => {
    const activeIndex = categories.indexOf(selectedCategory);
    const activeElement = tabsRef.current[activeIndex];

    if (activeElement) {
      setTabStyle({
        left: activeElement.offsetLeft,
        width: activeElement.offsetWidth,
      });
    }
  }, [selectedCategory, categories]);

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

  return (
    <section
      id="projects"
      ref={ref}
      className="py-20 bg-transparent transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={twMerge(
            'text-center mb-16 transition-all duration-1000',
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10',
          )}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A showcase of my technical projects, open source contributions, and
            experiments.
          </p>
        </div>

        {/* Mobile Custom Dropdown */}
        <div className="md:hidden flex justify-center mb-12 px-6">
          <div className="relative w-full max-w-sm" ref={dropdownRef}>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur-sm" />

            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="relative w-full flex items-center justify-between bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl px-6 py-3.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-semibold shadow-sm text-base"
            >
              <span>{selectedCategory}</span>
              <FaChevronDown
                className={`w-4 h-4 text-purple-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl shadow-xl overflow-hidden z-50 py-2"
                >
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsDropdownOpen(false);
                      }}
                      className={twMerge(
                        'w-full text-left px-6 py-3 transition-colors duration-200 flex items-center justify-between',
                        selectedCategory === category
                          ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5',
                      )}
                    >
                      <span>{category}</span>
                      {selectedCategory === category && (
                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Modern Tab Navigation - Desktop */}
        <div className="hidden md:flex justify-center mb-16">
          <div className="relative bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-full p-2 inline-flex flex-wrap justify-center gap-2 shadow-sm">
            {/* Sliding Background */}
            <div
              className="absolute top-2 bottom-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg shadow-purple-500/25 transition-all duration-300 ease-out"
              style={{
                left: tabStyle.left,
                width: tabStyle.width,
                opacity: tabStyle.width ? 1 : 0,
              }}
            />

            {categories.map((category, index) => (
              <button
                key={category}
                ref={(el) => {
                  tabsRef.current[index] = el;
                }}
                onClick={() => setSelectedCategory(category)}
                className={twMerge(
                  'relative px-6 py-3 rounded-full font-medium transition-colors duration-300 text-sm sm:text-base z-10 flex-shrink-0',
                  selectedCategory === category
                    ? 'text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Link
              key={project.id}
              href={`/projects/${generateSlug(project.title)}`}
              className={twMerge(
                'group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 text-left flex flex-col h-full',
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10',
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-600" />
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/80 to-transparent z-10 transition-opacity duration-300" />

                <div className="absolute top-4 left-4 z-20">
                  <span
                    className={twMerge(
                      'px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md',
                      getStatusClass(project.status),
                    )}
                  >
                    {project.status}
                  </span>
                </div>

                {!project.image && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl text-white/30">
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
              </div>

              {/* Project Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex space-x-3 text-sm text-gray-500 dark:text-gray-400">
                    {project.stars !== undefined && project.stars > 0 && (
                      <div
                        className="flex items-center space-x-1"
                        title="Stars"
                      >
                        <FaStar className="text-yellow-400" />
                        <span>{project.stars}</span>
                      </div>
                    )}
                    {project.forks !== undefined && project.forks > 0 && (
                      <div
                        className="flex items-center space-x-1"
                        title="Forks"
                      >
                        <FaCodeBranch className="text-blue-400" />
                        <span>{project.forks}</span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 flex-grow">
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

                {/* Action Buttons */}
                <div className="flex space-x-2 mt-auto">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-900 dark:bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaGithub />
                      <span>Code</span>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
