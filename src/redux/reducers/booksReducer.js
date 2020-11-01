import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function bookReducer(state = initialState.books, action) {
  switch (action.type) {
    case types.LOAD_BOOKS:
      return action.books;
    default:
      return state;
  }
}
