import React from 'react';
import { Element } from 'react-scroll';
import './App.css';
import Contact from './components/Contact/Contact';
import HomePage from './components/HomePage/HomePage';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="portfolio">
        <Element name="home" className="element">
          <HomePage />
        </Element>
        <Element name="skills" className="element">
          <Skills />
        </Element>
        <Element name="projects" className="element">
          <Projects />
        </Element>
        <Element name="contact" className="element">
          <Contact />
        </Element>
        {/* <div className="container">
        </div> */}
      </div>
    );
  }
}
