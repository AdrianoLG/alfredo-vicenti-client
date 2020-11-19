import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function booksReducer(state = initialState.books, action) {
  switch (action.type) {
    case types.CREATE_BOOK_SUCCESS:
      return [...state, { ...action.book.data }];
    case types.LOAD_BOOKS_SUCCESS:
      return action.books;
    case types.UPDATE_BOOK_SUCCESS:
      return state.map(book =>
        book.id === action.book.id ? action.book : book
      );
    case types.DELETE_BOOK_OPTIMISTIC:
      return state.filter(book => book.id !== action.book.id);
    default:
      return state;
  }
}
