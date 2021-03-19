import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function originalListReducer(
  state = initialState.originalList,
  action
) {
  switch (action.type) {
    case types.SAVE_ORIGINAL_LIST:
      return action.books;
    default:
      return state;
  }
}
