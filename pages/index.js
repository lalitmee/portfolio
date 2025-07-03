import React from 'react';
import Head from 'next/head';
import { TypeAnimation } from 'react-type-animation';
import { FaTwitter, FaGithub, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';

import NavBar from '../components/NavBar';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Resume from '../components/Resume';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

class HomePage extends React.Component {
  render() {
    return (
      <div className="bg-gray-100 min-h-screen" id="home">
        <Head>
          <title>Lalit Kumar | Portfolio</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <NavBar />

        <main>
          <div className="relative h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/images/coding-background.jpg)' }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 text-white text-center p-8">
              <div className="flex justify-center items-center mb-6">
                <img
                  alt="Lalit Kumar"
                  src="https://avatars1.githubusercontent.com/u/10762218?s=460&v=4"
                  className="w-40 h-40 rounded-full border-4 border-white shadow-lg"
                />
              </div>

              <h1 className="text-6xl font-extrabold leading-tight mb-4">
                Lalit <span className="text-blue-400">Kumar</span>
              </h1>

              <div className="text-3xl font-semibold mb-8">
                <TypeAnimation
                  sequence={[
                    'Software Developer',
                    1000,
                    'Front End Developer',
                    1000,
                    'Open Source Enthusiast',
                    1000,
                    'Footballer',
                    1000,
                    'Music Lover',
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </div>

              <div className="flex justify-center space-x-6">
                <a
                  href="https://www.linkedin.com/in/lalitmee/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-400 transition-colors duration-300"
                >
                  <FaLinkedin size={35} />
                </a>
                <a
                  href="https://www.github.com/lalitmee/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-400 transition-colors duration-300"
                >
                  <FaGithub size={35} />
                </a>
                <a
                  href="https://www.facebook.com/iamlalitmee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-600 transition-colors duration-300"
                >
                  <FaFacebook size={35} />
                </a>
                <a
                  href="https://www.twitter.com/lalitmee/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-300 transition-colors duration-300"
                >
                  <FaTwitter size={35} />
                </a>
                <a
                  href="https://www.instagram.com/lalitmee/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-pink-400 transition-colors duration-300"
                >
                  <FaInstagram size={35} />
                </a>
              </div>
            </div>
          </div>

          <Skills />
          <Projects />
          <Resume />
          <Contact />
        </main>

        <Footer />
      </div>
    );
  }
}

export default HomePage;
