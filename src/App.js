import React from 'react';
import { Element } from 'react-scroll';
import './App.css';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import HomePage from './components/HomePage/HomePage';
import Projects from './components/Projects/Projects';
import Quotes from './components/Quotes/Quotes';
import Skills from './components/Skills/Skills';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="portfolio">
        <Element name="home" className="homepage">
          <HomePage />
        </Element>
        <Element name="skills" className="skills">
          <Skills />
        </Element>
        <Element name="quotes" className="quotes">
          <Quotes />
        </Element>
        <Element name="projects" className="projects">
          <Projects />
        </Element>
        <Element name="contact" className="contact">
          <Contact />
        </Element>
        <Element name="footer" className="footer">
          <Footer />
        </Element>
      </div>
    );
  }
}
