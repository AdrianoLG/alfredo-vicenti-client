import * as types from '../actions/actionTypes';
import initialState from './initialState';
import { sortAsc, sortDesc } from '../../utils/filterCollections';

export default function booksReducer(state = initialState.books, action) {
  switch (action.type) {
    case types.CREATE_BOOK_SUCCESS:
      return sortAsc([...state, { ...action.book.data }], 'title');
    case types.LOAD_BOOKS_SUCCESS:
      return sortAsc(action.books, 'title');
    case types.REFRESH_BOOK_LIST:
      return action.books;
    case types.LOAD_GROUP_BOOKS_SUCCESS:
      return sortAsc(action.books, 'title');
    case types.UPDATE_BOOK_SUCCESS:
      return sortAsc(state, 'title').map(book =>
        book.id === action.book.id ? action.book : book
      );
    case types.DELETE_BOOK_OPTIMISTIC:
      return state.filter(book => book.id !== action.book.id);
    case types.FILTER_BOOKS_BY_CATEGORY:
      return state.filter(book => book.category === action.category);
    case types.FILTER_BOOKS_BY_AUTHOR:
      return state.filter(book => book.author === action.author);
    case types.FILTER_BOOKS_BY_EDITORIAL:
      return state.filter(book => book.editorial === action.editorial);
    case types.FILTER_BOOKS_BY_RATED:
      return state.filter(book => book.rating === action.rating);
    case types.FILTER_BOOKS_BY_VALUE:
      return action.books.filter(
        book =>
          book.title.toLowerCase().includes(action.value) ||
          book.author.toLowerCase().includes(action.value) ||
          book.category.toLowerCase().includes(action.value)
      );
    case types.FILTER_BOOKS_NO_VALUE:
      return state;
    case types.RESET_BOOKS_FILTERS:
      return action.books;
    case types.ORDER_BOOKS_BY_TITLE_ASC:
      return sortAsc([...state], 'title');
    case types.ORDER_BOOKS_BY_TITLE_DESC:
      return sortDesc([...state], 'title');
    case types.ORDER_BOOKS_BY_AUTHOR_ASC:
      return sortAsc([...state], 'author');
    case types.ORDER_BOOKS_BY_AUTHOR_DESC:
      return sortDesc([...state], 'author');
    case types.ORDER_BOOKS_BY_CATEGORY_ASC:
      return sortAsc([...state], 'category');
    case types.ORDER_BOOKS_BY_CATEGORY_DESC:
      return sortDesc([...state], 'category');
    default:
      return state;
  }
}
