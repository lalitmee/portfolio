import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import {
  FaAward,
  FaBriefcase,
  FaCalendarAlt,
  FaCertificate,
  FaChartLine,
  FaChevronDown,
  FaCloud,
  FaCode,
  FaCss3Alt,
  FaDownload,
  FaExternalLinkAlt,
  FaGraduationCap,
  FaHtml5,
  FaJava,
  FaJsSquare,
  FaMapMarkerAlt,
  FaPython,
  FaReact,
  FaRocket,
  FaUsers,
} from 'react-icons/fa';
import { SiHackerrank, SiUdacity } from 'react-icons/si';
import { useInView } from 'react-intersection-observer';
import { twMerge } from 'tailwind-merge';
import portfolioData from '../data/portfolio.json';
import { getTechIcon } from '../utils/techIcons';
import Tabs from './ui/Tabs';

const tabs = [
  {
    key: 'experience',
    label: portfolioData.sections.resume.tabs.experience,
    icon: <FaBriefcase />,
  },
  {
    key: 'education',
    label: portfolioData.sections.resume.tabs.education,
    icon: <FaGraduationCap />,
  },
  {
    key: 'certifications',
    label: portfolioData.sections.resume.tabs.certifications,
    icon: <FaCertificate />,
  },
];

const Resume: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'experience' | 'education' | 'certifications'
  >('experience');

  const [ref, isVisible] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

  const activeTabLabel = tabs.find((t) => t.key === activeTab)?.label;

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      FaCloud: <FaCloud />,
      FaRocket: <FaRocket />,
      FaUsers: <FaUsers />,
      FaCode: <FaCode />,
      FaCertificate: <FaCertificate />,
      FaCss3Alt: <FaCss3Alt />,
      FaReact: <FaReact />,
      FaJsSquare: <FaJsSquare />,
      FaHtml5: <FaHtml5 />,
      FaJava: <FaJava />,
      FaPython: <FaPython />,
      FaChalkboardTeacher: <FaUsers className="text-green-500" />,
      // Specific icons
      SiUdacity: <SiUdacity />,
      SiHackerrank: <SiHackerrank />,
    };

    // Fallback logic for specific names if not in map directly but in json
    if (iconName === 'FaCss3Alt') return <FaCss3Alt />;
    if (iconName === 'FaReact') return <FaReact />;
    if (iconName === 'FaJsSquare') return <FaJsSquare />;
    if (iconName === 'FaHtml5') return <FaHtml5 />;
    if (iconName === 'FaJava') return <FaJava />;
    if (iconName === 'FaPython') return <FaPython />;
    if (iconName === 'SiUdacity') return <SiUdacity />;
    if (iconName === 'SiHackerrank') return <SiHackerrank />;

    return icons[iconName] || <FaCertificate />;
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = portfolioData.personal.resume;
    link.download = `${portfolioData.personal.name.replace(/\s+/g, '-')}-Resume.pdf`;
    link.click();
  };

  return (
    <section
      id="resume"
      ref={ref}
      className="py-20 bg-transparent relative overflow-hidden transition-colors duration-500"
    >
      {/* Background Effects - Simplified */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-primary-500/10 to-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 rounded-full px-4 py-2 text-sm text-gray-900 dark:text-white mb-6 shadow-sm">
            <FaBriefcase className="text-primary-600 dark:text-primary-400" />
            <span>{portfolioData.sections.resume.title}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {portfolioData.sections.resume.heading.split(' & ')[0]} &
            <span className="bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent ml-2 sm:ml-4">
              {portfolioData.sections.resume.heading.split(' & ')[1]}
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            {portfolioData.stats.experience.value}{' '}
            {portfolioData.sections.resume.description}
          </p>

          <button
            onClick={downloadResume}
            className="group bg-gradient-to-r from-primary-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-transform duration-300 flex items-center space-x-2 mx-auto hover:scale-[1.02] active:scale-[0.98]"
          >
            <FaDownload className="group-hover:animate-bounce-vertical" />
            <span>{portfolioData.sections.resume.downloadButton}</span>
          </button>
        </div>

        {/* Mobile Custom Dropdown */}
        <div className="md:hidden flex justify-center mb-12 px-6">
          <div className="relative w-full max-w-sm" ref={dropdownRef}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-blue-500/10 rounded-xl blur-sm" />

            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="relative w-full flex items-center justify-between bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl px-6 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all font-semibold shadow-sm text-base"
            >
              <div className="flex items-center gap-2">
                {tabs.find((t) => t.key === activeTab)?.icon}
                <span>{activeTabLabel}</span>
              </div>
              <FaChevronDown
                className={`w-4 h-4 text-primary-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
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
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => {
                        setActiveTab(tab.key as any);
                        setIsDropdownOpen(false);
                      }}
                      className={twMerge(
                        'w-full text-left px-6 py-3 transition-colors duration-200 flex items-center justify-between',
                        activeTab === tab.key
                          ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 font-bold'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5',
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {tab.icon}
                        <span>{tab.label}</span>
                      </div>
                      {activeTab === tab.key && (
                        <div className="w-2 h-2 rounded-full bg-primary-500" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Modern Tab Navigation - Desktop */}
        <Tabs
          tabs={tabs.map((t) => ({ id: t.key, label: t.label, icon: t.icon }))}
          activeId={activeTab}
          onChange={(id) => setActiveTab(id as any)}
          className="hidden md:flex mb-16"
        />

        {/* Content Section with Sliding Animation */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {/* Experience Timeline */}
            {activeTab === 'experience' && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Timeline Line - Hidden on Mobile */}
                <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-blue-500 opacity-50"></div>

                <div className="space-y-8 md:space-y-12">
                  {portfolioData.experience.map((exp, index) => (
                    <div
                      key={exp.id}
                      className={twMerge(
                        'relative pl-0 md:pl-20 transition-all duration-500',
                      )}
                    >
                      {/* Timeline Dot - Hidden on Mobile */}
                      <div className="hidden md:block absolute left-6 w-4 h-4 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full border-4 border-slate-900 shadow-lg shadow-primary-500/25 animate-pulse"></div>

                      {/* Content Card */}
                      <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white dark:hover:bg-white/10 hover:border-primary-200 dark:hover:border-white/20 transition-all duration-300 group shadow-sm">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
                                {exp.position}
                              </h3>
                              {exp.current && (
                                <div className="md:hidden bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
                                  Current
                                </div>
                              )}
                            </div>
                            <h4 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">
                              {exp.company}
                            </h4>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center space-x-2">
                                <FaMapMarkerAlt />
                                <span>{exp.location}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <FaCalendarAlt />
                                <span>
                                  {exp.startDate} -{' '}
                                  {exp.current ? 'Present' : exp.endDate}
                                </span>
                              </div>
                              {exp.teamSize && (
                                <div className="flex items-center space-x-2 hover:text-primary-300 transition-colors duration-300">
                                  <FaUsers />
                                  <span>{exp.teamSize}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          {exp.current && (
                            <div className="hidden md:block bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-2 rounded-full text-sm font-semibold animate-pulse self-start md:self-center">
                              Current
                            </div>
                          )}
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                          {exp.description}
                        </p>

                        {/* Key Achievements */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                            <FaAward className="text-yellow-500 dark:text-yellow-400" />
                            <span>Key Achievements</span>
                          </h4>
                          <ul className="space-y-3">
                            {exp.achievements.map((achievement, idx) => (
                              <li
                                key={idx}
                                className="flex items-start space-x-3 group/item"
                              >
                                <span className="text-green-400 mt-1 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                                  ✓
                                </span>
                                <span className="text-gray-600 dark:text-gray-300 group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors duration-300">
                                  {achievement}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                            Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-500/20 text-primary-600 dark:text-primary-300 border border-primary-200 dark:border-primary-500/30 px-3 py-1 rounded-full text-sm font-medium hover:bg-primary-100 dark:hover:bg-primary-500/30 hover:scale-105 transition-all duration-300"
                              >
                                {getTechIcon(tech)}
                                <span>{tech}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Impact Metric */}
                        {exp.impact && (
                          <div className="bg-primary-50 dark:bg-primary-900/20 backdrop-blur-md border border-primary-100 dark:border-primary-500/20 p-4 rounded-xl hover:border-primary-200 dark:hover:border-primary-500/40 transition-all duration-300">
                            <div className="flex items-center space-x-3">
                              <FaChartLine className="text-primary-500 dark:text-primary-400 text-xl" />
                              <span className="font-semibold text-primary-700 dark:text-primary-300">
                                Impact: {exp.impact}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Education Section */}
            {activeTab === 'education' && (
              <motion.div
                key="education"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {portfolioData.education.map((edu, index) => (
                  <div
                    key={edu.id}
                    className={twMerge(
                      'relative overflow-hidden bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-8 hover:bg-white dark:hover:bg-white/10 hover:border-primary-200 dark:hover:border-white/20 transition-all duration-300 group shadow-sm',
                    )}
                  >
                    {/* Watermark Background */}
                    {(edu as any).image && (
                      <div className="absolute -right-4 -bottom-4 w-64 h-64 opacity-[0.15] dark:opacity-[0.10] transform rotate-12 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-6 pointer-events-none z-0">
                        <img
                          src={(edu as any).image}
                          alt=""
                          className="w-full h-full object-contain grayscale"
                        />
                      </div>
                    )}

                    <div
                      className={`${(edu as any).image ? 'relative z-10 flex flex-col md:flex-row gap-6 lg:gap-8 items-start' : 'relative z-10'}`}
                    >
                      {/* Logo Section */}
                      {(edu as any).image && (
                        <div className="w-full md:w-32 flex-shrink-0 flex justify-center md:justify-start">
                          <div className="w-32 h-32 p-4 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10 flex items-center justify-center shadow-sm">
                            <img
                              src={(edu as any).image}
                              alt={`${edu.institution} Logo`}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      )}

                      {/* Content Section */}
                      <div className="flex-1 w-full">
                        <div className="flex flex-wrap justify-between items-start mb-6">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors duration-300">
                              {edu.degree} in {edu.field}
                            </h3>
                            <div className="text-lg font-semibold bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent mb-3">
                              {edu.institution}
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center space-x-2 hover:text-primary-300 transition-colors duration-300">
                                <FaMapMarkerAlt />
                                <span>{edu.location}</span>
                              </div>
                              <div className="flex items-center space-x-2 hover:text-primary-300 transition-colors duration-300">
                                <FaCalendarAlt />
                                <span>
                                  {edu.startDate} - {edu.endDate}
                                </span>
                              </div>
                              {edu.gpa && (
                                <div className="flex items-center space-x-2 hover:text-primary-300 transition-colors duration-300">
                                  <FaAward />
                                  <span>GPA: {edu.gpa}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Achievements */}
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                            Achievements & Activities
                          </h4>
                          <ul className="space-y-3">
                            {edu.achievements.map((achievement, idx) => (
                              <li
                                key={idx}
                                className="flex items-start space-x-3 group/item"
                              >
                                <span className="text-green-400 mt-1 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                                  ✓
                                </span>
                                <span className="text-gray-600 dark:text-gray-300 group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors duration-300">
                                  {achievement}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Certifications Section */}
            {activeTab === 'certifications' && (
              <motion.div
                key="certifications"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                {portfolioData.certifications
                  .filter((cert) => cert.active)
                  .map((cert) => (
                    <div
                      key={cert.id}
                      className={twMerge(
                        'transition-[opacity,transform] duration-500 ease-out', // Explicitly scope transition properties
                      )}
                    >
                      <div
                        className="relative overflow-hidden bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl flex flex-col h-full group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-out transform-gpu"
                        style={{ transitionDelay: '0ms' }} // Explicitly override any inherited delay (just in case)
                      >
                        {/* Background Image/Gradient */}
                        <div className="absolute inset-0 pointer-events-none">
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary-500/5 dark:to-primary-500/10 z-0" />

                          {/* Logo Background - Watermark - Increased Opacity */}
                          {(cert as any).image ? (
                            <div className="absolute -right-4 -bottom-4 w-40 h-40 opacity-[0.25] dark:opacity-[0.15] transform rotate-12 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-6">
                              <img
                                src={(cert as any).image}
                                alt=""
                                className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                              />
                            </div>
                          ) : (
                            <div
                              className={`absolute -right-4 -bottom-4 text-9xl ${(cert as any).color.replace('text-', 'text-opacity-[0.25] dark:text-opacity-[0.15] text-')} transform rotate-12 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-6`}
                            >
                              {getIconComponent(cert.icon)}
                            </div>
                          )}
                        </div>

                        <div className="p-6 relative z-10 flex-grow">
                          <div className="flex items-start space-x-4 mb-4">
                            <div
                              className={`flex-shrink-0 w-14 h-14 p-3 bg-white/50 dark:bg-white/10 backdrop-blur-sm rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-sm flex items-center justify-center`}
                            >
                              {(cert as any).image ? (
                                <img
                                  src={(cert as any).image}
                                  alt={cert.issuer}
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                <div className={`text-3xl ${cert.color}`}>
                                  {getIconComponent(cert.icon)}
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors duration-300 line-clamp-2">
                                {cert.name}
                              </h3>
                              <div className="bg-gradient-to-r from-primary-600 to-blue-500 bg-clip-text text-transparent font-semibold mb-1 truncate">
                                {cert.issuer}
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                <FaCalendarAlt className="text-xs" />
                                <span>{cert.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Full Width Button */}
                        {cert.credentialId && (
                          <a
                            href={cert.link || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative z-20 w-full mt-auto border-t border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-white py-4 px-6 transition-all duration-300 font-medium text-sm flex items-center justify-center space-x-2 group/btn bg-transparent hover:bg-primary-50 dark:hover:bg-white/10"
                          >
                            <span className="uppercase tracking-wider font-semibold">
                              {cert.link
                                ? 'View Credential'
                                : `ID: ${cert.credentialId}`}
                            </span>
                            <FaExternalLinkAlt className="text-xs group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Resume;
