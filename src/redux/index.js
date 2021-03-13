import { combineReducers } from 'redux';

// We will combine reducers here. As a default, we will define a default
// reducer. This will be brought into store.js

// Once we have our first reducer, delete this one and instead import the
// other reducer from its respective filename

const initialState = {};

const defaultReducer = (state = initialState, action) => {
  switch (action) {
    default:
      return state;
  }
};

// As we build additional reducers we can add them below

const appReducer = combineReducers({
  default: defaultReducer,
});

export default appReducer;
