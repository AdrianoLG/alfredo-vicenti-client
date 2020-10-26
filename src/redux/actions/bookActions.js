import * as types from './actionTypes';

export function createBook(book) {
  return { type: types.CREATE_BOOK, book };
}
