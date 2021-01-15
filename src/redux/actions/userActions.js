import * as types from './actionTypes';
import * as userApi from '../../api/userApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function createUserSuccess(user) {
  return { type: types.CREATE_USER_SUCCESS, user };
}

export function loggedUserSuccess(user) {
  return { type: types.LOGGED_USER_SUCCESS, user };
}

export function saveUser(user) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return userApi
      .saveUser(user)
      .then(savedUser => {
        dispatch(createUserSuccess(savedUser));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function userLogin(user) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return userApi
      .loginUser(user)
      .then(loggedUser => {
        dispatch(loggedUserSuccess(loggedUser));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
