import * as types from './actionTypes';
import * as bookApi from '../../api/bookApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadBooksSuccess(books) {
  return { type: types.LOAD_BOOKS_SUCCESS, books };
}

export function loadBooks() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return bookApi
      .getBooks()
      .then(books => {
        dispatch(loadBooksSuccess(books.data));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
