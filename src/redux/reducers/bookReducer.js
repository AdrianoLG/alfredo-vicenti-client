import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function bookReducer(state = initialState.book, action) {
  switch (action.type) {
    case types.CREATE_BOOK:
      return [...state, { ...action.book }];
    case types.LOAD_BOOK:
      return action.book;
    default:
      return state;
  }
}
