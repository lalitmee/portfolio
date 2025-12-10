import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import { useInView } from 'react-intersection-observer';
import { generateSlug } from '../utils/slug';
import { getTechIcon } from '../utils/techIcons';
import BottomSheet from './ui/BottomSheet';
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
    case 'active':
    case 'In Development':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800';
    case 'completed':
    case 'Live':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800';
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
          <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 rounded-full px-4 py-2 text-sm text-gray-900 dark:text-white mb-6 shadow-sm">
            <FaCode className="text-primary-600 dark:text-primary-400" />
            <span>{portfolioData.sections.projects.title}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {portfolioData.sections.projects.heading.split(' ')[0]}
            <span className="bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent ml-2 sm:ml-4">
              {portfolioData.sections.projects.heading
                .split(' ')
                .slice(1)
                .join(' ')}
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            {portfolioData.sections.projects.description}
          </p>
        </div>

        {/* Mobile Custom Dropdown */}
        <div className="md:hidden flex justify-center mb-12 px-6">
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-blue-500/10 rounded-xl blur-sm" />

            <button
              onClick={() => setIsDropdownOpen(true)}
              className="relative w-full flex items-center justify-between bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl px-6 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all font-semibold shadow-sm text-base"
            >
              <div className="flex items-center gap-2">
                <span>{selectedCategory}</span>
              </div>
              <FaChevronDown
                className={`w-4 h-4 text-primary-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        </div>

        <BottomSheet
          isOpen={isDropdownOpen}
          onClose={() => setIsDropdownOpen(false)}
          title="Select Category"
        >
          <div className="flex flex-col gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setIsDropdownOpen(false);
                }}
                className={twMerge(
                  'w-full text-left px-6 py-4 rounded-xl transition-all duration-200 flex items-center justify-between',
                  selectedCategory === category
                    ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 font-bold border border-primary-500/20'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent',
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{category}</span>
                </div>
                {selectedCategory === category && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-500 shadow-sm shadow-primary-500/50" />
                )}
              </button>
            ))}
          </div>
        </BottomSheet>

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
