// This file merely configures the store for hot reloading.
// This boilerplate file is likely to be the same for each project that uses Redux.
// With Redux, the actual stores are in /reducers.

import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import rootReducer from '../rootReducer';

export default function configureStore() {
  const middleware = [
    thunkMiddleware,
    promiseMiddleware,
  ];

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../rootReducer', () => {
      const nextReducer = require('../rootReducer').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
