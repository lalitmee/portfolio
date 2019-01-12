import React from 'react';
import { Element } from 'react-scroll';
import './App.css';
import HomePage from './components/HomePage/HomePage';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';

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
        {/* <div className="container">
        </div> */}
      </div>
    );
  }
}
