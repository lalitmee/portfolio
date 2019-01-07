import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import HomePage from './components/HomePage/HomePage';

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
