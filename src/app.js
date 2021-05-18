import React, { useContext } from 'react';
import * as Etebase from 'etebase';
import { ConfirmPassword, Navbar } from './components';
import { UserContext, UserSessionContext } from './store';
import Routes from './routes';

export default function App() {
  const [user, setUser] = useContext(UserContext);
  const [userSession, setUserSession] = useContext(UserSessionContext);
  console.log('App: The user is', user);
  console.log('App: The user session is', userSession);
  if (userSession && !user) {
    return (
      <div>
        <ConfirmPassword />
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
}
