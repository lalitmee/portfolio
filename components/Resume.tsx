import React, { useEffect, useState } from 'react';
import {
  FaAward,
  FaBriefcase,
  FaCalendarAlt,
  FaCertificate,
  FaChartLine,
  FaCloud,
  FaCode,
  FaDownload,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaRocket,
  FaUsers,
} from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';
import portfolioData from '../data/portfolio.json';

const Resume: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'experience' | 'education' | 'certifications'
  >('experience');
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

    const element = document.getElementById('resume');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      FaCloud: <FaCloud />,
      FaRocket: <FaRocket />,
      FaUsers: <FaUsers />,
      FaCode: <FaCode />,
    };
    return icons[iconName] || <FaCertificate />;
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = portfolioData.personal.resume;
    link.download = 'Lalit-Kumar-Resume.pdf';
    link.click();
  };

  return (
    <section
      id="resume"
      className="py-20 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-sm text-white mb-6">
            <FaBriefcase className="text-purple-400" />
            <span>Professional Journey</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Career &
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent ml-2 sm:ml-4">
              Achievements
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            {portfolioData.stats.experience.value} years of progressive growth
            in software engineering, from junior developer to technical leader
          </p>

          <button
            onClick={downloadResume}
            className="group bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center space-x-2 mx-auto hover:scale-105"
          >
            <FaDownload className="group-hover:animate-bounce" />
            <span>Download Resume</span>
          </button>
        </div>

        {/* Modern Tab Navigation */}
        <div className="flex justify-center mb-16">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              {[
                {
                  key: 'experience',
                  label: 'Experience',
                  icon: <FaBriefcase />,
                },
                {
                  key: 'education',
                  label: 'Education',
                  icon: <FaGraduationCap />,
                },
                {
                  key: 'certifications',
                  label: 'Certifications',
                  icon: <FaCertificate />,
                },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() =>
                    setActiveTab(
                      tab.key as 'experience' | 'education' | 'certifications',
                    )
                  }
                  className={twMerge(
                    'relative flex items-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-500 group text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start',
                    activeTab === tab.key
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25'
                      : 'text-gray-300 hover:text-white hover:bg-white/10',
                  )}
                >
                  {/* Background glow for inactive tabs */}
                  {activeTab !== tab.key && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  )}

                  <span className="text-lg relative z-10 group-hover:scale-110 transition-transform duration-300">
                    {tab.icon}
                  </span>
                  <span className="relative z-10">{tab.label}</span>

                  {/* Active indicator - properly centered */}
                  {activeTab === tab.key && (
                    <div className="absolute bottom-2 left-2 right-2 h-0.5 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        {activeTab === 'experience' && (
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500 opacity-50"></div>

            <div className="space-y-12">
              {portfolioData.experience.map((exp, index) => (
                <div
                  key={exp.id}
                  className={twMerge(
                    'relative pl-20 transition-all duration-700',
                    isVisible
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-8',
                  )}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full border-4 border-slate-900 shadow-lg shadow-purple-500/25 animate-pulse"></div>

                  {/* Content Card */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 group">
                    <div className="flex flex-wrap justify-between items-start mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                          {exp.position}
                        </h3>
                        <div className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-3">
                          {exp.company}
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-2 hover:text-purple-300 transition-colors duration-300">
                            <FaMapMarkerAlt />
                            <span>{exp.location}</span>
                          </div>
                          <div className="flex items-center space-x-2 hover:text-purple-300 transition-colors duration-300">
                            <FaCalendarAlt />
                            <span>
                              {exp.startDate} -{' '}
                              {exp.current ? 'Present' : exp.endDate}
                            </span>
                          </div>
                          {exp.teamSize && (
                            <div className="flex items-center space-x-2 hover:text-purple-300 transition-colors duration-300">
                              <FaUsers />
                              <span>{exp.teamSize}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      {exp.current && (
                        <div className="bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
                          Current
                        </div>
                      )}
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Key Achievements */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-white mb-4 flex items-center space-x-2">
                        <FaAward className="text-yellow-400" />
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
                            <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                              {achievement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-white mb-4">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full text-sm font-medium hover:bg-purple-500/30 hover:scale-105 transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Impact Metric */}
                    {exp.impact && (
                      <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-md border border-white/10 p-4 rounded-xl hover:border-white/20 transition-all duration-300">
                        <div className="flex items-center space-x-3">
                          <FaChartLine className="text-purple-400 text-xl" />
                          <span className="font-semibold text-purple-300">
                            Impact: {exp.impact}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {activeTab === 'education' && (
          <div className="space-y-8">
            {portfolioData.education.map((edu, index) => (
              <div
                key={edu.id}
                className={twMerge(
                  'bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 group',
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8',
                )}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex flex-wrap justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                      {edu.degree} in {edu.field}
                    </h3>
                    <div className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-3">
                      {edu.institution}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-2 hover:text-purple-300 transition-colors duration-300">
                        <FaMapMarkerAlt />
                        <span>{edu.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 hover:text-purple-300 transition-colors duration-300">
                        <FaCalendarAlt />
                        <span>
                          {edu.startDate} - {edu.endDate}
                        </span>
                      </div>
                      {edu.gpa && (
                        <div className="flex items-center space-x-2 hover:text-purple-300 transition-colors duration-300">
                          <FaAward />
                          <span>GPA: {edu.gpa}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="font-semibold text-white mb-4">
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
                        <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications Section */}
        {activeTab === 'certifications' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {portfolioData.certifications
              .filter((cert) => cert.active)
              .map((cert, index) => (
                <div
                  key={cert.id}
                  className={twMerge(
                    'bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 group',
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8',
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`text-3xl ${cert.color} group-hover:scale-110 transition-transform duration-300`}
                    >
                      {getIconComponent(cert.icon)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                        {cert.name}
                      </h3>
                      <div className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-semibold mb-3">
                        {cert.issuer}
                      </div>
                      <div className="text-sm text-gray-400 space-y-2">
                        <div className="hover:text-purple-300 transition-colors duration-300">
                          Issued: {cert.date}
                        </div>
                        {cert.validUntil && (
                          <div className="hover:text-purple-300 transition-colors duration-300">
                            Valid until: {cert.validUntil}
                          </div>
                        )}
                        {cert.credentialId && (
                          <div className="font-mono text-xs bg-white/10 backdrop-blur-md border border-white/10 px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-300">
                            ID: {cert.credentialId}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Career Summary */}
        <div className="mt-16 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 hover:border-white/30 transition-all duration-500">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Career Impact Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            {[
              {
                value: portfolioData.stats.experience.value,
                label: portfolioData.stats.experience.label,
                icon: <FaBriefcase />,
              },
              {
                value: portfolioData.stats.projects.value,
                label: portfolioData.stats.projects.label,
                icon: <FaCode />,
              },
              {
                value: '25+',
                label: 'Team Members Mentored',
                icon: <FaUsers />,
              },
              {
                value: '$10M+',
                label: 'Business Impact',
                icon: <FaChartLine />,
              },
            ].map((stat, index) => (
              <div
                key={index}
                className={twMerge(
                  'bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-500',
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-purple-400 text-3xl mb-4 mx-auto flex justify-center hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
