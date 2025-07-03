import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaTwitter, FaGithub, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import OverlayNavigation from '../OverlayNavigation';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 ${
        scrolled ? 'bg-white shadow-md text-gray-800' : 'bg-transparent text-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              alt="Lalit Kumar"
              src="https://avatars1.githubusercontent.com/u/10762218?s=460&v=4"
              className="w-12 h-12 rounded-full border-2 border-white shadow-md"
            />
            <Link href="/" className="ml-4 text-2xl font-bold hover:text-blue-400 transition-colors duration-300">
                Lalit Kumar
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="https://www.linkedin.com/in/lalitmee/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors duration-300"
            >
              <FaLinkedin size={28} />
            </a>
            <a
              href="https://www.github.com/lalitmee/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors duration-300"
            >
              <FaGithub size={28} />
            </a>
            <a
              href="https://www.facebook.com/iamlalitmee"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors duration-300"
            >
              <FaFacebook size={28} />
            </a>
            <a
              href="https://www.twitter.com/lalitmee/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition-colors duration-300"
            >
              <FaTwitter size={28} />
            </a>
            <a
              href="https://www.instagram.com/lalitmee/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors duration-300"
            >
              <FaInstagram size={28} />
            </a>
          </div>
          <div className="md:hidden">
            <OverlayNavigation />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
