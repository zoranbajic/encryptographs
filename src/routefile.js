import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  About,
  Albums,
  ChangePassword,
  Gallery,
  Home,
  Login,
  PublicKey,
  Signup,
  Invites,
} from './components';

class RouteFile extends Component {
  render() {
    return (
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/changepassword' element={<ChangePassword />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/albums' element={<Albums />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/publickey' element={<PublicKey />} />
        <Route path='/invites' element={<Invites />} />
        <Route path='/about' element={<About />} />
      </Routes>
    );
  }
}

export default RouteFile;
