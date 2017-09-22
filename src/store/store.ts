declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

import { callApiMiddleware } from "@zuck/core";
import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

import reducers from "./reducers/reducers";


let store: any = null;

const defaultOptions = {
  history: null
};

function storeCreator(initialState = {}, options = defaultOptions) {
  let composeEnhancers = compose;
  if (typeof document !== "undefined" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }

  const middleware = [
    thunkMiddleware,
    callApiMiddleware
  ];

  store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );

  return store;
}

function getStoreRef() {
  return store;
}

export {
  getStoreRef,
  storeCreator as createStore
};
