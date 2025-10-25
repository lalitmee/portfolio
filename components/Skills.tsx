import React, { useEffect, useRef, useState } from 'react';
import {
  FaAws,
  FaBrain,
  FaCloud,
  FaCode,
  FaDatabase,
  FaDocker,
  FaGitAlt,
  FaLightbulb,
  FaMobile,
  FaNodeJs,
  FaPython,
  FaReact,
  FaRocket,
  FaServer,
  FaTools,
} from 'react-icons/fa';
import {
  SiFirebase,
  SiGraphql,
  SiJavascript,
  SiJenkins,
  SiKubernetes,
  SiMongodb,
  SiNextdotjs,
  SiPostgresql,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si';
import { twMerge } from 'tailwind-merge';

interface Skill {
  name: string;
  level: number;
  years: number;
  icon: React.ReactNode;
  category: string;
  color: string;
}

interface SkillCategory {
  name: string;
  icon: React.ReactNode;
  skills: Skill[];
  gradient: string;
}

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Frontend');
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    const element = document.getElementById('skills');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

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
          icon: <FaReact />,
          category: 'Frontend',
          color: 'text-blue-400',
        },
        {
          name: 'TypeScript',
          level: 90,
          years: 5,
          icon: <SiTypescript />,
          category: 'Frontend',
          color: 'text-blue-500',
        },
        {
          name: 'Next.js',
          level: 88,
          years: 4,
          icon: <SiNextdotjs />,
          category: 'Frontend',
          color: 'text-white',
        },
        {
          name: 'JavaScript',
          level: 95,
          years: 7,
          icon: <SiJavascript />,
          category: 'Frontend',
          color: 'text-yellow-400',
        },
        {
          name: 'Tailwind CSS',
          level: 92,
          years: 3,
          icon: <SiTailwindcss />,
          category: 'Frontend',
          color: 'text-cyan-400',
        },
        {
          name: 'React Native',
          level: 75,
          years: 2,
          icon: <FaMobile />,
          category: 'Frontend',
          color: 'text-blue-400',
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
          icon: <FaNodeJs />,
          category: 'Backend',
          color: 'text-green-400',
        },
        {
          name: 'Python',
          level: 85,
          years: 4,
          icon: <FaPython />,
          category: 'Backend',
          color: 'text-yellow-400',
        },
        {
          name: 'GraphQL',
          level: 80,
          years: 3,
          icon: <SiGraphql />,
          category: 'Backend',
          color: 'text-pink-400',
        },
        {
          name: 'REST APIs',
          level: 95,
          years: 7,
          icon: <FaServer />,
          category: 'Backend',
          color: 'text-blue-400',
        },
        {
          name: 'Microservices',
          level: 85,
          years: 4,
          icon: <FaTools />,
          category: 'Backend',
          color: 'text-purple-400',
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
          icon: <SiMongodb />,
          category: 'Database',
          color: 'text-green-400',
        },
        {
          name: 'PostgreSQL',
          level: 85,
          years: 4,
          icon: <SiPostgresql />,
          category: 'Database',
          color: 'text-blue-400',
        },
        {
          name: 'Redis',
          level: 80,
          years: 3,
          icon: <SiRedis />,
          category: 'Database',
          color: 'text-red-400',
        },
        {
          name: 'Firebase',
          level: 75,
          years: 2,
          icon: <SiFirebase />,
          category: 'Database',
          color: 'text-orange-400',
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
          icon: <FaAws />,
          category: 'DevOps & Cloud',
          color: 'text-orange-400',
        },
        {
          name: 'Docker',
          level: 88,
          years: 5,
          icon: <FaDocker />,
          category: 'DevOps & Cloud',
          color: 'text-blue-400',
        },
        {
          name: 'Kubernetes',
          level: 75,
          years: 3,
          icon: <SiKubernetes />,
          category: 'DevOps & Cloud',
          color: 'text-blue-500',
        },
        {
          name: 'Jenkins',
          level: 80,
          years: 3,
          icon: <SiJenkins />,
          category: 'DevOps & Cloud',
          color: 'text-blue-400',
        },
        {
          name: 'Vercel',
          level: 90,
          years: 3,
          icon: <SiVercel />,
          category: 'DevOps & Cloud',
          color: 'text-white',
        },
        {
          name: 'Git',
          level: 95,
          years: 7,
          icon: <FaGitAlt />,
          category: 'DevOps & Cloud',
          color: 'text-orange-400',
        },
      ],
    },
  ];

  const currentSkills =
    skillCategories.find((cat) => cat.name === activeCategory)?.skills || [];
  const currentGradient =
    skillCategories.find((cat) => cat.name === activeCategory)?.gradient ||
    'from-purple-500 to-blue-500';

  return (
    <section
      id="skills"
      className="py-20 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '2s' }}
        />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse" />
      </div>

      {/* Mouse Follower */}
      <div
        className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl pointer-events-none transition-all duration-300"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-sm text-white mb-6">
            <FaBrain className="text-purple-400" />
            <span>Technical Expertise</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Skills &
            <span
              className={`bg-gradient-to-r ${currentGradient} bg-clip-text text-transparent ml-2 sm:ml-4`}
            >
              Technologies
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Mastering cutting-edge technologies to build scalable, performant,
            and innovative solutions
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-16">
          {skillCategories.map((category, index) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={twMerge(
                'group relative flex items-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-2xl font-semibold transition-all duration-500 overflow-hidden text-sm sm:text-base',
                activeCategory === category.name
                  ? 'bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white/5 backdrop-blur-md border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/20',
              )}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl`}
              />

              <span className="text-xl relative z-10 group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </span>
              <span className="relative z-10">{category.name}</span>

              {/* Bottom accent line - properly centered */}
              {activeCategory === category.name && (
                <div className="absolute bottom-2 left-4 right-4 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {currentSkills.map((skill, index) => (
            <div
              key={skill.name}
              className={twMerge(
                'group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden',
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8',
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`text-3xl ${skill.color} group-hover:scale-110 transition-transform duration-300`}
                    >
                      {skill.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                        {skill.name}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {skill.years} years experience
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {skill.level}%
                    </div>
                    <div className="text-xs text-gray-400">Proficiency</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative">
                  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${currentGradient} transition-all duration-1000 ease-out relative overflow-hidden`}
                      style={{
                        width: isVisible ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 100 + 300}ms`,
                      }}
                    >
                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </div>
                  </div>

                  {/* Skill Level Indicator */}
                  <div
                    className="absolute top-0 h-3 w-1 bg-white rounded-full shadow-lg transition-all duration-1000"
                    style={{
                      left: isVisible ? `${skill.level}%` : '0%',
                      transitionDelay: `${index * 100 + 500}ms`,
                    }}
                  />
                </div>

                {/* Experience Badge */}
                <div className="mt-4 inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-3 py-1 text-xs text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Active</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-16">
          {[
            {
              icon: FaRocket,
              number: '15+',
              label: 'Technologies',
              color: 'text-purple-400',
            },
            {
              icon: FaLightbulb,
              number: '7+',
              label: 'Years Experience',
              color: 'text-blue-400',
            },
            {
              icon: FaCode,
              number: '50+',
              label: 'Projects',
              color: 'text-green-400',
            },
            {
              icon: FaBrain,
              number: '10+',
              label: 'Team Members Led',
              color: 'text-pink-400',
            },
          ].map((stat, index) => (
            <div
              key={index}
              className={twMerge(
                'text-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500',
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <stat.icon className={`text-4xl ${stat.color} mx-auto mb-4`} />
              <div className="text-3xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Professional Highlights */}
        <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Professional Impact
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🚀',
                title: 'Performance Optimization',
                description:
                  'Improved application performance by 60% through advanced optimization techniques and modern architecture patterns',
                metric: '60% faster',
              },
              {
                icon: '👥',
                title: 'Team Leadership',
                description:
                  'Led cross-functional teams of 10+ developers, delivering complex projects on time with exceptional quality',
                metric: '10+ developers',
              },
              {
                icon: '🏗️',
                title: 'Architecture Design',
                description:
                  'Designed scalable microservices architecture serving 1M+ users with 99.9% uptime and reliability',
                metric: '99.9% uptime',
              },
            ].map((highlight, index) => (
              <div
                key={index}
                className={twMerge(
                  'text-center bg-white/5 backdrop-blur-md rounded-2xl p-6 hover:bg-white/10 transition-all duration-500',
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4',
                )}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="text-4xl mb-4">{highlight.icon}</div>
                <h4 className="text-xl font-bold text-white mb-3">
                  {highlight.title}
                </h4>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {highlight.description}
                </p>
                <div className="inline-flex items-center bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-md rounded-full px-4 py-2 text-sm font-semibold text-purple-300">
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
