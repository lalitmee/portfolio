import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router } from 'react-router-dom';
import App from './App';
import ResumePage from './components/Resume/ResumePage';
import './index.css';

const history = createBrowserHistory();

history.listen(() => {
  window.scrollTo(0, 0);
});

ReactDOM.render(
  <Router history={history}>
    <div>
      <Route path="/" exact component={App} />
      <Route path="/resume" component={ResumePage} />
    </div>
  </Router>,
  document.getElementById('root')
);
