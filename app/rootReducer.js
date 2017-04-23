import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import recipes from './reducers/recipes';
import searchText from './reducers/searchText';

const rootReducer = combineReducers({
  routing: routerReducer,

  recipes,
  searchText,
});

export default rootReducer;
