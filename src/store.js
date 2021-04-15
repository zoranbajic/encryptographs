import React, { useState } from 'react';

export const UserContext = React.createContext(null);

const Store = ({ children }) => {
  const initialUserState = '';
  const [user, setUser] = useState(initialUserState);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
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
