import React from 'react';
import * as Etebase from 'etebase';
import { Home, Navbar } from './components';
import Routes from './routes';

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
}
