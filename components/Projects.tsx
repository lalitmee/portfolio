import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
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
import { useInView } from 'react-intersection-observer';
import { generateSlug } from '../utils/slug';
import { getTechIcon } from '../utils/techIcons';
import Tabs from './ui/Tabs';

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

import { twMerge } from 'tailwind-merge';

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

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [ref] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [projectsWithStats, setProjectsWithStats] = useState<Project[]>([]);
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

  // Removed client-side fetching to avoid GitHub API rate limiting (403 errors)
  // Future improvement: Fetch these stats at build time or use a proxy
  useEffect(() => {
    setProjectsWithStats(portfolioData.projects as Project[]);
  }, []);

  const projects =
    projectsWithStats.length > 0
      ? projectsWithStats
      : (portfolioData.projects as Project[]);

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects],
  );

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array: Project[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const filteredProjects = useMemo(() => {
    const filtered =
      selectedCategory === 'All'
        ? projects
        : projects.filter((p) => p.category === selectedCategory);

    // Always shuffle for dynamic effect
    return shuffleArray(filtered);
  }, [selectedCategory, projects]);

  return (
    <section id="projects" ref={ref} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-primary-600 dark:text-primary-400 font-semibold tracking-wide uppercase">
            {portfolioData.sections.projects.title}
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {portfolioData.sections.projects.heading}
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
            {portfolioData.sections.projects.description}
          </p>
        </div>

        {/* Modern Tab Navigation - Desktop */}
        <Tabs
          tabs={categories.map((c) => ({ id: c, label: c }))}
          activeId={selectedCategory}
          onChange={setSelectedCategory}
          className="hidden md:flex mb-16"
        />

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 25,
                  opacity: { duration: 0.2 },
                }}
                className="h-full"
              >
                <div
                  className={twMerge(
                    'group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 text-left flex flex-col h-full relative',
                  )}
                >
                  <Link
                    href={`/projects/${generateSlug(project.title)}`}
                    className="absolute inset-0 z-10"
                    aria-label={`View project ${project.title}`}
                  >
                    <span className="sr-only">View Project</span>
                  </Link>
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden shrink-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-blue-600" />
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
                          {project.category.includes('Nanodegree') && (
                            <FaCode />
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-6 flex flex-col flex-grow pointer-events-none">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
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
                    <div className="flex space-x-2 mt-auto pointer-events-auto">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative z-20 flex-1 bg-gray-900 dark:bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
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
                          className="relative z-20 flex-1 bg-gradient-to-r from-primary-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaExternalLinkAlt />
                          <span>Live</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
