import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import rootReducer from '../rootReducer';

export default function configureStore() {
  const middleware = [
    thunkMiddleware,

    promiseMiddleware,
  ];

  return createStore(
    rootReducer,
    applyMiddleware(...middleware)
  );
}
