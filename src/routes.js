import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Login } from './components';

class Routes extends Component {
  render() {
    return (
      // <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/home' component={Home} />
        <Route path='/login' component={Login} />
      </Switch>
      // </Router>
    );
  }
}

export default Routes;
