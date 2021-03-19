import * as types from './actionTypes';

export function saveOriginal(books) {
  return { type: types.SAVE_ORIGINAL_LIST, books };
}

export function saveCounter(counter) {
  return { type: types.SAVE_COUNTER, counter };
}

export function saveOriginalList(books) {
  return function (dispatch) {
    dispatch(saveOriginal(books));
  };
}

export function saveBooksCounter(counter) {
  return function (dispatch) {
    dispatch(saveCounter(counter));
  };
}
