import React from 'react';
import ReactDOM from 'react-dom';
import * as Etebase from 'etebase';
import App from './app';
import Store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Store>
    <Router>
      <App />
    </Router>
  </Store>,

  document.getElementById('app') // make sure this is the same as the id of the div in the index.html
);
