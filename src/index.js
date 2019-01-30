import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import ResumePage from './components/Resume/ResumePage';
import './index.css';

ReactDOM.render(
  <Router>
    <div>
      <Route path="/" exact component={App} />
      <Route path="/resume" component={ResumePage} />
    </div>
  </Router>,
  document.getElementById('root')
);
