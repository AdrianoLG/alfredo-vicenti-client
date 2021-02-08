import * as types from './actionTypes';
import * as userApi from '../../api/userApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function getUserSuccess(user) {
  return { type: types.GET_USER_SUCCESS, user };
}

export function retrieveUser(userId, bearer) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return userApi
      .getUser(userId, bearer)
      .then(user => {
        dispatch(getUserSuccess(user));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
