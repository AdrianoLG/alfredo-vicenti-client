import * as types from './actionTypes';
import * as bookApi from '../../api/bookApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function createBookSuccess(book) {
  return { type: types.CREATE_BOOK_SUCCESS, book };
}

export function loadBookSuccess(book) {
  return { type: types.LOAD_BOOK_SUCCESS, book };
}

export function updateBookSuccess(book) {
  return { type: types.UPDATE_BOOK_SUCCESS, book };
}

export function loadBook(bookId) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return bookApi
      .getBook(bookId)
      .then(book => {
        dispatch(loadBookSuccess(book.data));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveBook(book) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return bookApi
      .saveBook(book)
      .then(savedBook => {
        book.id
          ? dispatch(updateBookSuccess(savedBook.data))
          : dispatch(createBookSuccess(savedBook));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
