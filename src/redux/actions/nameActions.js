import * as types from './actionTypes';
import { beginApiCall } from './apiStatusActions';

export function getNameSuccess(name) {
  return { type: types.GET_NAME_SUCCESS, name };
}

export function getName(name) {
  return function (dispatch) {
    dispatch(beginApiCall());
    dispatch(getNameSuccess(name));
  };
}
