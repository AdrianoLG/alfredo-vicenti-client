import * as types from './actionTypes';
import * as bookApi from '../../api/bookApi';

export function createBookSuccess(book) {
  return { type: types.CREATE_BOOK, book };
}

export function loadBookSuccess(book) {
  return { type: types.LOAD_BOOK, book };
}

export function updateBookSuccess(book) {
  return { type: types.UPDATE_BOOK, book };
}

export function loadBook(bookId) {
  return function (dispatch) {
    return bookApi
      .getBook(bookId)
      .then(book => {
        dispatch(loadBookSuccess(book.data));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveBook(book) {
  return function (dispatch) {
    return bookApi.saveBook(book).then(savedBook => {
      book.id
        ? dispatch(updateBookSuccess(savedBook.data))
        : dispatch(createBookSuccess(savedBook));
    });
  };
}
