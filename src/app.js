import React from 'react';
import * as Etebase from 'etebase';
import Home from './components/Home';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes />
      <Home />
    </div>
  );
}
