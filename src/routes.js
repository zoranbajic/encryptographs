import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
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

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/changepassword' component={ChangePassword} />
        <Route path='/home' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/albums' component={Albums} />
        <Route path='/gallery' component={Gallery} />
        <Route path='/signup' component={Signup} />
        <Route path='/publickey' component={PublicKey} />
        <Route path='/invites' component={Invites} />
        <Route path='/about' component={About} />
      </Switch>
    );
  }
}

export default Routes;
