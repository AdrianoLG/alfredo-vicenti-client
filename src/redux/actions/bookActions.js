import * as types from './actionTypes';
import * as bookApi from '../../api/bookApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadBooksSuccess(books) {
  return { type: types.LOAD_BOOKS_SUCCESS, books };
}

export function createBookSuccess(book) {
  return { type: types.CREATE_BOOK_SUCCESS, book };
}

export function loadBookSuccess(book) {
  return { type: types.LOAD_BOOK_SUCCESS, book };
}

export function updateBookSuccess(book) {
  return { type: types.UPDATE_BOOK_SUCCESS, book };
}

export function deleteBookOptimistic(book) {
  return { type: types.DELETE_BOOK_OPTIMISTIC, book };
}

export function filterBooksCategory(category) {
  return { type: types.FILTER_BOOKS_BY_CATEGORY, category };
}

export function filterBooksAuthor(author) {
  return { type: types.FILTER_BOOKS_BY_AUTHOR, author };
}

export function filterBooksRating(rating) {
  return { type: types.FILTER_BOOKS_BY_RATING, rating };
}

export function filterBooksReadDate(date) {
  return { type: types.FILTER_BOOKS_BY_READ_DATE, date };
}

export function filterBooksLentDate(lent) {
  return { type: types.FILTER_BOOKS_BY_LENT, lent };
}

export function filterBooksEditorial(editorial) {
  return { type: types.FILTER_BOOKS_BY_EDITORIAL, editorial };
}

export function resetBooksFilters(books) {
  return { type: types.RESET_BOOKS_FILTERS, books };
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

export function loadBook(bookId) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return bookApi
      .getBook(bookId)
      .then(book => {
        dispatch(loadBookSuccess(book.data));
        return book;
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

export function deleteBook(book) {
  return function (dispatch) {
    dispatch(deleteBookOptimistic(book));
    return bookApi.deleteBook(book.id);
  };
}

export function filterBooksByCategory(category) {
  return function (dispatch) {
    dispatch(filterBooksCategory(category));
  };
}

export function filterBooksByAuthor(author) {
  return function (dispatch) {
    dispatch(filterBooksAuthor(author));
  };
}

export function filterBooksByRating(rating) {
  return function (dispatch) {
    dispatch(filterBooksRating(rating));
  };
}

export function filterBooksByReadDate(date) {
  return function (dispatch) {
    dispatch(filterBooksReadDate(date));
  };
}

export function filterBooksByLent(date) {
  return function (dispatch) {
    dispatch(filterBooksLentDate(date));
  };
}

export function filterBooksByEditorial(editorial) {
  return function (dispatch) {
    dispatch(filterBooksEditorial(editorial));
  };
}

export function resetFilters(books) {
  return function (dispatch) {
    dispatch(resetBooksFilters(books));
  };
}
