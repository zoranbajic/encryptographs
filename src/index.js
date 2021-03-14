import React from 'react';
import ReactDOM from 'react-dom';
import * as Etebase from 'etebase';
import App from './app';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app') // make sure this is the same as the id of the div in the index.html
);
