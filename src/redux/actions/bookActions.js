import * as types from './actionTypes';
import * as bookApi from '../../api/bookApi';

export function createBook(book) {
  return { type: types.CREATE_BOOK, book };
}

export function loadBookSuccess(book) {
  return { type: types.LOAD_BOOK, book };
}

export function loadBook() {
  return function (dispatch) {
    return bookApi
      .getBook()
      .then(book => {
        dispatch(loadBookSuccess(book.data));
      })
      .catch(error => {
        throw error;
      });
  };
}
