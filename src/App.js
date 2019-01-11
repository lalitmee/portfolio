import React from 'react';
import './App.css';
import HomePage from './components/HomePage/HomePage';
import Skills from './components/Skills/Skills';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="portfolio">
        <HomePage />
        <div className="container">
          <Skills />
        </div>
      </div>
    );
  }
}
