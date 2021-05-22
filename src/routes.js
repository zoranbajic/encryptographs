import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Albums, ChangePassword, Home, Login, Signup } from './components';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/changepassword' component={ChangePassword} />
        <Route path='/home' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/albums' component={Albums} />
        <Route path='/signup' component={Signup} />
      </Switch>
    );
  }
}

export default Routes;
