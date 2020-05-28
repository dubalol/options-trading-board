import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import wsMiddleware from "./options/wsMiddleware";
// Comment for production
// import { createLogger } from "redux-logger";

import options from "./options/reducer";

// const loggerMiddleware = createLogger();

const middleware = [
  thunkMiddleware,
  // loggerMiddleware,
  wsMiddleware
];

const store = createStore(
  options,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
);

export default store;