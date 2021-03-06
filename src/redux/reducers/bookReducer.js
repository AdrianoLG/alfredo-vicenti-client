import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function bookReducer(state = initialState.book, action) {
  switch (action.type) {
    case types.LOAD_BOOK_SUCCESS:
      return action.book;
    case types.RESET_BOOK:
      return {};
    default:
      return state;
  }
}
