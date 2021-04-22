import React, { useState, useEffect } from 'react';
import * as Etebase from 'etebase';

export const UserContext = React.createContext();
export const UserSessionContext = React.createContext();

const Store = ({ children }) => {
  const initialUser = '';
  const initialUserSession = '';

  const localSession = JSON.parse(sessionStorage.getItem('sessionInfo'));
  const [userSession, setUserSession] = useState(
    localSession || initialUserSession
  );

  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    sessionStorage.setItem('sessionInfo', JSON.stringify(userSession));
    const loggedInStatus = async (userSession) => {
      if (userSession && !user) {
        const etebase = await Etebase.Account.restore(userSession);
        setUser(etebase);
      }
    };
    loggedInStatus(userSession);
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
