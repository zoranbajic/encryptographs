import React, { useState, useEffect } from 'react';
import * as Etebase from 'etebase';

export const UserContext = React.createContext();
export const UserSessionContext = React.createContext();

const Store = ({ children }) => {
  const initialUser = '';
  const initialUserSession = '';

  // Pulls the session ID from sessionStorage (if it exists)
  const localSession = JSON.parse(sessionStorage.getItem('sessionInfo'));

  // If a session ID exists (the user is already logged in), we set the
  // userSession to that value. If it doesn't (it's falsy), we set userSession
  // to an empty string
  const [userSession, setUserSession] = useState(
    localSession || initialUserSession
  );

  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    // Creates a key in sessionStorage with the session ID
    // This is run any time the userSession state value changes
    sessionStorage.setItem('sessionInfo', JSON.stringify(userSession));

    // If a session ID exists and the user state value is falsy, we pull the
    // user from the server and set the state value to that user
    const loggedInUser = async (userSession) => {
      if (userSession && !user) {
        // const currentUser = await Etebase.Account.restore(userSession);
        setUser(userSession);
      }
    };
    // loggedInUser(userSession);
  }, [userSession]);

  return (
    <UserSessionContext.Provider value={[userSession, setUserSession]}>
      <UserContext.Provider value={[user, setUser]}>
        {children}
      </UserContext.Provider>
    </UserSessionContext.Provider>
  );
};

export default Store;

// // This is where we create the store for our app

// import { createStore, applyMiddleware } from 'redux';
// import appReducer from './redux/index';
// import { createLogger } from 'redux-logger';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunkMiddleware from 'redux-thunk';

// // `withExtraArgument` gives us access to axios in our async action creators!
// // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument

// let middleware = [thunkMiddleware, createLogger({ collapsed: true })];

// // This line creates our store with our reducer and includes the Redux devtools
// // extension

// export default createStore(
//   appReducer,
//   composeWithDevTools(applyMiddleware(...middleware))
// );
