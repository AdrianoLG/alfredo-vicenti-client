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
    case types.FILTER_BOOKS_BY_CATEGORY:
      return state.filter(book => book.category === action.category);
    case types.FILTER_BOOKS_BY_AUTHOR:
      return state.filter(book => book.author === action.author);
    case types.FILTER_BOOKS_BY_RATING:
      return state.filter(book => book.rating === action.rating);
    case types.FILTER_BOOKS_BY_READ_DATE:
      return state.filter(book => book.read_date === action.read_date);
    case types.FILTER_BOOKS_BY_READ_DATE:
      return state.filter(book => book.lent_date === action.lent_date);
    case types.FILTER_BOOKS_BY_EDITORIAL:
      return state.filter(book => book.editorial === action.editorial);
    case types.RESET_BOOKS_FILTERS:
      return action.books;
    default:
      return state;
  }
}
