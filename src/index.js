import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import Context from './context';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Context>
    <Router>
      <App />
    </Router>
  </Context>,

  document.getElementById('app') // make sure this is the same as the id of the div in the index.html
);
