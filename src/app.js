import React from 'react';
import * as Etebase from 'etebase';
import { ConfirmPassword, Navbar } from './components';
import { UserContext } from './store';
import Routes from './routes';

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
}
