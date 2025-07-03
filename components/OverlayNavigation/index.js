import React, { useState } from 'react';
import { Link } from 'react-scroll';

const OverlayNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const navClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleNav}
        className="fixed top-4 right-4 z-50 w-8 h-8 focus:outline-none"
      >
        <span
          className={`block w-full h-0.5 bg-gray-800 transform transition duration-300 ease-in-out ${
            isOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        ></span>
        <span
          className={`block w-full h-0.5 bg-gray-800 mt-1.5 transform transition duration-300 ease-in-out ${
            isOpen ? 'opacity-0' : ''
          }`}
        ></span>
        <span
          className={`block w-full h-0.5 bg-gray-800 mt-1.5 transform transition duration-300 ease-in-out ${
            isOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        ></span>
      </button>

      <div
        className={`fixed top-0 left-0 w-full h-full bg-gradient-to-r from-green-400 to-blue-500 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full">
          <ul className="text-4xl text-white space-y-8">
            <li>
              <Link
                onClick={navClick}
                to="home"
                smooth="easeInOutQuart"
                delay={200}
                duration={1200}
                className="cursor-pointer hover:text-gray-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={navClick}
                to="skills"
                smooth="easeInOutQuart"
                delay={200}
                duration={1200}
                className="cursor-pointer hover:text-gray-200"
              >
                Skills
              </Link>
            </li>
            <li>
              <Link
                onClick={navClick}
                to="projects"
                smooth="easeInOutQuart"
                delay={200}
                duration={1200}
                className="cursor-pointer hover:text-gray-200"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                onClick={navClick}
                to="resume"
                smooth="easeInOutQuart"
                delay={200}
                duration={1200}
                className="cursor-pointer hover:text-gray-200"
              >
                Resume
              </Link>
            </li>
            <li>
              <Link
                onClick={navClick}
                to="contact"
                smooth="easeInOutQuart"
                delay={200}
                duration={1200}
                className="cursor-pointer hover:text-gray-200"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default OverlayNavigation;
