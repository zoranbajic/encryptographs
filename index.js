import React from 'react';
import ReactDOM from 'react-dom';
import * as Etebase from 'etebase';
import Home from './app/components/Home';

ReactDOM.render(
  <Home />,
  document.getElementById('app') // make sure this is the same as the id of the div in your index.html
);
