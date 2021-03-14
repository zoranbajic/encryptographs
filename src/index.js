import React from 'react';
import ReactDOM from 'react-dom';
import * as Etebase from 'etebase';
import App from './components/App';
import Login from './components/Login';
import store from './store';
import { Provider } from 'react-redux';
import './styles.css';

ReactDOM.render(
  <Provider store={store}>
    <Login />
  </Provider>,
  document.getElementById('app') // make sure this is the same as the id of the div in the index.html
);
