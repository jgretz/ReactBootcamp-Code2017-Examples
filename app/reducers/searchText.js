import {UPDATE_SEARCH_TEXT} from '../actions';

export default (state = '', action) => {
  switch (action.type) {
    case UPDATE_SEARCH_TEXT:
      return action.payload;

    default:
      return state;
  }
};
