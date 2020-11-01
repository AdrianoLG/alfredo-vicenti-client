import * as types from './actionTypes';
import * as bookApi from '../../api/bookApi';

export function loadBooksSuccess(books) {
  return { type: types.LOAD_BOOKS, books };
}

export function loadBooks() {
  return function (dispatch) {
    return bookApi
      .getBooks()
      .then(books => {
        dispatch(loadBooksSuccess(books.data));
      })
      .catch(error => {
        throw error;
      });
  };
}
