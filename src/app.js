import React, { useContext } from 'react';
import { ConfirmPassword, Navbar } from './components';
import { UserContext, UserSessionContext } from './context';
import Routes from './routes';
import 'fontsource-roboto';

export default function App() {
  const [user, setUser] = useContext(UserContext);
  const [userSession, setUserSession] = useContext(UserSessionContext);
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
