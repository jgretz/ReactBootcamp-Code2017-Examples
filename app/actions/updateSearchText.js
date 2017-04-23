export const UPDATE_SEARCH_TEXT = 'UPDATE_SEARCH_TEXT';
export const updateSearchText = e =>
({
  type: UPDATE_SEARCH_TEXT,
  payload: e.target.value,
});
