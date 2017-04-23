import {SEARCH_FOR_RECIPES} from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case SEARCH_FOR_RECIPES:
      return action.payload;

    default:
      return state;
  }
};
