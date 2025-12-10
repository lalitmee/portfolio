import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import {
  FaBrain,
  FaChevronDown,
  FaCloud,
  FaCode,
  FaDatabase,
  FaLightbulb,
  FaRocket,
  FaServer,
} from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { twMerge } from 'tailwind-merge';
import portfolioData from '../data/portfolio.json';
import { getTechIcon } from '../utils/techIcons';

interface Skill {
  name: string;
  level: number;
  years: number;
  category: string;
}

interface SkillCategory {
  name: string;
  icon: React.ReactNode;
  skills: Skill[];
  gradient: string;
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    icon: <FaCode />,
    gradient: 'from-purple-500 to-pink-500',
    skills: [
      {
        name: 'React',
        level: 95,
        years: 6,
        category: 'Frontend',
      },
      {
        name: 'TypeScript',
        level: 90,
        years: 5,
        category: 'Frontend',
      },
      {
        name: 'Next.js',
        level: 88,
        years: 4,
        category: 'Frontend',
      },
      {
        name: 'JavaScript',
        level: 95,
        years: 7,
        category: 'Frontend',
      },
      {
        name: 'Tailwind CSS',
        level: 92,
        years: 3,
        category: 'Frontend',
      },
      {
        name: 'React Native',
        level: 75,
        years: 2,
        category: 'Frontend',
      },
    ],
  },
  {
    name: 'Backend',
    icon: <FaServer />,
    gradient: 'from-blue-500 to-cyan-500',
    skills: [
      {
        name: 'Node.js',
        level: 90,
        years: 6,
        category: 'Backend',
      },
      {
        name: 'Python',
        level: 85,
        years: 4,
        category: 'Backend',
      },
      {
        name: 'GraphQL',
        level: 80,
        years: 3,
        category: 'Backend',
      },
      {
        name: 'REST APIs',
        level: 95,
        years: 7,
        category: 'Backend',
      },
      {
        name: 'Microservices',
        level: 85,
        years: 4,
        category: 'Backend', // Mapped to generic FaTools in previous impl? No, I need to check getTechIcon for 'Microservices'.
        // I don't see 'Microservices' in getTechIcon. I should add it or map it to something.
      },
    ],
  },
  {
    name: 'Database',
    icon: <FaDatabase />,
    gradient: 'from-green-500 to-teal-500',
    skills: [
      {
        name: 'MongoDB',
        level: 88,
        years: 5,
        category: 'Database',
      },
      {
        name: 'PostgreSQL',
        level: 85,
        years: 4,
        category: 'Database',
      },
      {
        name: 'Redis',
        level: 80,
        years: 3,
        category: 'Database',
      },
      {
        name: 'Firebase',
        level: 75,
        years: 2,
        category: 'Database',
      },
    ],
  },
  {
    name: 'DevOps & Cloud',
    icon: <FaCloud />,
    gradient: 'from-orange-500 to-red-500',
    skills: [
      {
        name: 'AWS',
        level: 85,
        years: 4,
        category: 'DevOps & Cloud',
      },
      {
        name: 'Docker',
        level: 88,
        years: 5,
        category: 'DevOps & Cloud',
      },
      {
        name: 'Kubernetes',
        level: 75,
        years: 3,
        category: 'DevOps & Cloud',
      },
      {
        name: 'Jenkins',
        level: 80,
        years: 3,
        category: 'DevOps & Cloud',
      },
      {
        name: 'Vercel',
        level: 90,
        years: 3,
        category: 'DevOps & Cloud',
      },
      {
        name: 'Git',
        level: 95,
        years: 7,
        category: 'DevOps & Cloud',
      },
    ],
  },
];

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].name);
  const isAutomatic = useRef(true);

  const [ref, isVisible] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    const activeIndex = skillCategories.findIndex(
      (cat) => cat.name === activeCategory,
    );
    const activeTab = tabsRef.current[activeIndex];

    if (activeTab) {
      setTabStyle({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
      });
    }
  }, [activeCategory]);

  const currentSkills =
    skillCategories.find((cat) => cat.name === activeCategory)?.skills || [];
  const currentGradient =
    skillCategories.find((cat) => cat.name === activeCategory)?.gradient ||
    'from-purple-500 to-blue-500';

  return (
    <section
      id="skills"
      ref={ref}
      className="py-20 bg-transparent relative overflow-hidden transition-colors duration-500"
    >
      {/* Animated Background Elements - Simplified */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 rounded-full px-4 py-2 text-sm text-gray-900 dark:text-white mb-6 shadow-sm">
            <FaBrain className="text-purple-600 dark:text-purple-400" />
            <span>{portfolioData.sections.skills.title}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {portfolioData.sections.skills.heading.split(' & ')[0]} &
            <span
              className={`bg-gradient-to-r ${currentGradient} bg-clip-text text-transparent ml-2 sm:ml-4`}
            >
              {portfolioData.sections.skills.heading.split(' & ')[1]}
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {portfolioData.sections.skills.description}
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
              <div className="flex items-center gap-2">
                <span>{activeCategory}</span>
              </div>
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
                  {skillCategories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => {
                        setActiveCategory(category.name);
                        setIsDropdownOpen(false);
                        isAutomatic.current = false; // Stop auto-rotation when user selects
                      }}
                      className={twMerge(
                        'w-full text-left px-6 py-3 transition-colors duration-200 flex items-center justify-between',
                        activeCategory === category.name
                          ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5',
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {category.icon}
                        <span>{category.name}</span>
                      </div>
                      {activeCategory === category.name && (
                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Category Tabs - Desktop */}
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

            {skillCategories.map((category, index) => (
              <button
                key={category.name}
                ref={(el) => {
                  tabsRef.current[index] = el;
                }}
                onClick={() => setActiveCategory(category.name)}
                className={twMerge(
                  'relative flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors duration-300 text-sm sm:text-base z-10',
                  activeCategory === category.name
                    ? 'text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
                )}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{ perspective: '1000px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
              exit: {
                opacity: 0,
                transition: { duration: 0.1 },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16"
          >
            {currentSkills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={{
                  hidden: { opacity: 0, rotateY: 90 },
                  visible: {
                    opacity: 1,
                    rotateY: 0,
                    transition: {
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                    },
                  },
                }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={twMerge(
                  'group relative overflow-hidden bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-6 hover:bg-white dark:hover:bg-white/10 hover:border-purple-200 dark:hover:border-white/20 transition-colors duration-300 shadow-sm hover:shadow-xl',
                )}
              >
                {/* Watermark Background */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-500/5 dark:to-purple-500/10 z-0" />
                  <div className="absolute -right-4 -bottom-4 transform rotate-12 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-6">
                    {getTechIcon(
                      skill.name,
                      'text-9xl opacity-15 dark:opacity-15',
                    )}
                  </div>
                </div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      {/* Main Icon */}
                      <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                        {getTechIcon(skill.name)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors duration-300">
                          {skill.name}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          {skill.years} years experience
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {skill.level}%
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Proficiency
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative">
                    <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${currentGradient} relative overflow-hidden`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-16">
          {[
            {
              icon: FaRocket,
              number: portfolioData.stats.technologies.value,
              label: portfolioData.stats.technologies.label,
              color: 'text-purple-400',
            },
            {
              icon: FaLightbulb,
              number: portfolioData.stats.experience.value,
              label: portfolioData.stats.experience.label,
              color: 'text-blue-400',
            },
            {
              icon: FaCode,
              number: portfolioData.stats.projects.value,
              label: 'Projects', // Keeping 'Projects' label as per UI design, though JSON says 'Projects Delivered'
              color: 'text-green-400',
            },
            {
              icon: FaBrain,
              number: portfolioData.stats.teamMembers.value,
              label: portfolioData.stats.teamMembers.label,
              color: 'text-pink-400',
            },
          ].map((stat, index) => (
            <div
              key={index}
              className={twMerge(
                'text-center bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-6 hover:bg-white dark:hover:bg-white/10 transition-all duration-300 shadow-sm',
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <stat.icon className={`text-4xl ${stat.color} mx-auto mb-4`} />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Professional Highlights */}
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-md dark:shadow-none">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {portfolioData.sections.skills.professionalImpactTitle}
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {portfolioData.professionalImpact.map((highlight, index) => (
              <div
                key={index}
                className={twMerge(
                  'text-center bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-2xl p-6 hover:bg-white dark:hover:bg-white/10 transition-all duration-300 border border-gray-200 dark:border-transparent shadow-sm',
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4',
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4">{highlight.icon}</div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {highlight.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {highlight.description}
                </p>
                <div className="inline-flex items-center bg-purple-50 dark:bg-purple-500/20 border border-purple-100 dark:border-purple-500/30 backdrop-blur-md rounded-full px-4 py-2 text-sm font-semibold text-purple-600 dark:text-purple-300">
                  {highlight.metric}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
