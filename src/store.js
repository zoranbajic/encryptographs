import React, { useState, useContext, useEffect } from 'react';
import * as Etebase from 'etebase';

export const UserContext = React.createContext();
export const UserSessionContext = React.createContext();

const loggedInStatus = (userSession) => {
  let theResponse = '';
  if (userSession) {
    const etebase = Etebase.Account.restore(userSession);
    console.log('The store etebase info is', etebase);
    theResponse = etebase;
  }
  console.log('The response in the store is', theResponse);
  return theResponse;
};

console.log('The store is run.');

const Store = ({ children }) => {
  const initialUser = '';
  const initialUserSession = '';

  const localSession = JSON.parse(sessionStorage.getItem('sessionInfo'));

  const [userSession, setUserSession] = useState(
    localSession || initialUserSession
  );
  console.log('The store user session is', userSession);
  const [user, setUser] = useState(loggedInStatus(userSession)) || initialUser;

  useEffect(() => {
    sessionStorage.setItem('sessionInfo', JSON.stringify(userSession));
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
