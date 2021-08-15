import React, { useState, useEffect } from 'react';
import * as Etebase from 'etebase';

export const UserContext = React.createContext();
export const UserSessionContext = React.createContext();
export const InviteContext = React.createContext();

const Store = ({ children }) => {
  const initialUser = '';
  const initialUserSession = '';
  const initialInvites = 0;

  // Pulls the session ID from sessionStorage (if it exists)
  const localSession = JSON.parse(sessionStorage.getItem('sessionInfo'));

  // If a session ID exists (the user is already logged in), we set the
  // userSession to that value. If it doesn't (it's falsy), we set userSession
  // to an empty string
  const [userSession, setUserSession] = useState(
    localSession || initialUserSession
  );

  const [user, setUser] = useState(initialUser);
  const [invites, setInvites] = useState(initialInvites);

  useEffect(() => {
    // Creates a key in sessionStorage with the session ID
    // This is run any time the userSession state value changes
    sessionStorage.setItem('sessionInfo', JSON.stringify(userSession));

    // If a session ID exists and the user state value is falsy, we pull the
    // user from the server and set the state value to that user
    // const loggedInUser = async (userSession) => {
    //   if (userSession && !user) {
    //     // const currentUser = await Etebase.Account.restore(userSession);
    //     setUser(userSession);
    //   }
    // };
    // loggedInUser(userSession);
  }, [userSession]);

  return (
    <UserSessionContext.Provider value={[userSession, setUserSession]}>
      <UserContext.Provider value={[user, setUser]}>
        <InviteContext.Provider value={[invites, setInvites]}>
          {children}
        </InviteContext.Provider>
      </UserContext.Provider>
    </UserSessionContext.Provider>
  );
};

export default Store;
