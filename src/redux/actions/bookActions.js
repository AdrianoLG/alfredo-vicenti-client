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

export function filterBooksEditorial(editorial) {
  return { type: types.FILTER_BOOKS_BY_EDITORIAL, editorial };
}

export function filterBooksValue(value, books) {
  return { type: types.FILTER_BOOKS_BY_VALUE, value, books };
}

export function filterBooksNoValue() {
  return { type: types.FILTER_BOOKS_NO_VALUE };
}

export function orderBooksTitleAsc(books) {
  return { type: types.ORDER_BOOKS_BY_TITLE_ASC, books };
}

export function orderBooksTitleDesc(books) {
  return { type: types.ORDER_BOOKS_BY_TITLE_DESC, books };
}

export function orderBooksAuthorAsc(books) {
  return { type: types.ORDER_BOOKS_BY_AUTHOR_ASC, books };
}

export function orderBooksAuthorDesc() {
  return { type: types.ORDER_BOOKS_BY_AUTHOR_DESC };
}

export function orderBooksCategoryAsc(books) {
  return { type: types.ORDER_BOOKS_BY_CATEGORY_ASC, books };
}

export function orderBooksCategoryDesc(books) {
  return { type: types.ORDER_BOOKS_BY_CATEGORY_DESC, books };
}

export function resetBooksFilters(books) {
  return { type: types.RESET_BOOKS_FILTERS, books };
}

export function loadBooks(userId) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return bookApi
      .getBooks(userId)
      .then(books => {
        dispatch(loadBooksSuccess(books.data));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function loadBook(bookId, userId) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return bookApi
      .getBook(bookId, userId)
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

export function deleteBook(book, userId) {
  return function (dispatch) {
    dispatch(deleteBookOptimistic(book));
    return bookApi.deleteBook(book.id, userId);
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

export function filterBooksByEditorial(editorial) {
  return function (dispatch) {
    dispatch(filterBooksEditorial(editorial));
  };
}

export function filterBooksByValue(value, books) {
  return function (dispatch) {
    books.length === 0
      ? dispatch(filterBooksNoValue())
      : dispatch(filterBooksValue(value, books));
  };
}

export function resetFilters(books) {
  return function (dispatch) {
    dispatch(resetBooksFilters(books));
  };
}

export function orderBooksByTitleAsc(books) {
  return function (dispatch) {
    dispatch(orderBooksTitleAsc(books));
  };
}

export function orderBooksByTitleDesc(books) {
  return function (dispatch) {
    dispatch(orderBooksTitleDesc(books));
  };
}

export function orderBooksByAuthorAsc(books) {
  return function (dispatch) {
    dispatch(orderBooksAuthorAsc(books));
  };
}

export function orderBooksByAuthorDesc() {
  return function (dispatch) {
    dispatch(orderBooksAuthorDesc());
  };
}

export function orderBooksByCategoryAsc(books) {
  return function (dispatch) {
    dispatch(orderBooksCategoryAsc(books));
  };
}

export function orderBooksByCategoryDesc(books) {
  return function (dispatch) {
    dispatch(orderBooksCategoryDesc(books));
  };
}
