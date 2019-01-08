import React from 'react';
import './App.css';
import HomePage from './components/HomePage/HomePage';
import NavBar from './components/NavBar/NavBar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="portfolio">
        <div className="container">
          <NavBar />
          <HomePage />
        </div>
      </div>
    );
  }
}
