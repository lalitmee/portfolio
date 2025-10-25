import React from 'react';
import {
  FaArrowUp,
  FaCalendarAlt,
  FaCode,
  FaEnvelope,
  FaGithub,
  FaHeart,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaTwitter,
} from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Resume', id: 'resume' },
    { name: 'Contact', id: 'contact' },
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/lalitmee/',
      icon: <FaLinkedin />,
      color: 'hover:text-blue-600',
      bgColor: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
    },
    {
      name: 'GitHub',
      href: 'https://www.github.com/lalitmee/',
      icon: <FaGithub />,
      color: 'hover:text-gray-900 dark:hover:text-gray-100',
      bgColor: 'hover:bg-gray-50 dark:hover:bg-gray-800',
    },
    {
      name: 'Twitter',
      href: 'https://www.twitter.com/lalitmee/',
      icon: <FaTwitter />,
      color: 'hover:text-blue-500',
      bgColor: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
    },
  ];

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      text: 'lalit.kumar@example.com',
      href: 'mailto:lalit.kumar@example.com',
    },
    {
      icon: <FaPhone />,
      text: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: <FaMapMarkerAlt />,
      text: 'San Francisco, CA',
      href: 'https://maps.google.com/?q=San+Francisco,CA',
    },
  ];

  const skills = [
    'React',
    'TypeScript',
    'Node.js',
    'Next.js',
    'AWS',
    'Docker',
    'Kubernetes',
    'PostgreSQL',
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Brand & Bio */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <FaCode className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Lalit Kumar</h3>
                  <p className="text-gray-400">Senior Software Engineer</p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                Passionate about creating exceptional digital experiences with
                7+ years of expertise in modern web technologies. Always excited
                to take on new challenges and collaborate on innovative
                projects.
              </p>

              {/* Skills Tags */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                  Core Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-purple-600 hover:text-white transition-colors duration-300 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Availability Status */}
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-300">
                  Available for new opportunities
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
                    >
                      <span className="w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span>{link.name}</span>
                    </button>
                  </li>
                ))}
                <li>
                  <a
                    href="/resume/Lalit-Kumar-Resume.pdf"
                    download
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
                  >
                    <span className="w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span>Download Resume</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Get In Touch</h4>
              <ul className="space-y-4">
                {contactInfo.map((info, index) => (
                  <li key={index}>
                    <a
                      href={info.href}
                      target={
                        info.href.startsWith('http') ? '_blank' : undefined
                      }
                      rel={
                        info.href.startsWith('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300 group"
                    >
                      <div className="text-purple-500 group-hover:text-purple-400 transition-colors duration-300">
                        {info.icon}
                      </div>
                      <span className="text-sm">{info.text}</span>
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="https://calendly.com/lalit-kumar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300 group"
                  >
                    <div className="text-purple-500 group-hover:text-purple-400 transition-colors duration-300">
                      <FaCalendarAlt />
                    </div>
                    <span className="text-sm">Schedule a meeting</span>
                  </a>
                </li>
              </ul>

              {/* Social Links */}
              <div className="mt-8">
                <h5 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                  Follow Me
                </h5>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={twMerge(
                        'w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 transition-all duration-300',
                        social.color,
                        social.bgColor,
                      )}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>© {currentYear} Lalit Kumar. All rights reserved.</span>
                <span className="hidden md:inline">•</span>
                <span className="flex items-center space-x-1">
                  <span>Made with</span>
                  <FaHeart className="text-red-500 animate-pulse" />
                  <span>and lots of</span>
                  <FaCode className="text-purple-500" />
                </span>
              </div>

              <div className="flex items-center space-x-6">
                {/* Back to Top */}
                <button
                  onClick={scrollToTop}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 group"
                  aria-label="Back to top"
                >
                  <span className="text-sm">Back to top</span>
                  <FaArrowUp className="group-hover:-translate-y-1 transition-transform duration-300" />
                </button>

                {/* Version */}
                <div className="text-xs text-gray-500">v2.0.0</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Button for Mobile */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center md:hidden z-50 hover:scale-110"
          aria-label="Back to top"
        >
          <FaArrowUp />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
