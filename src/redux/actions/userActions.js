import * as types from './actionTypes';
import * as userApi from '../../api/userApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function getUserSuccess(user) {
  return { type: types.GET_USER_SUCCESS, user };
}

export function updateUserSuccess(name, email) {
  return { type: types.UPDATE_USER_SUCCESS, name, email };
}

export function getUser(userData) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return userApi
      .userDataToRetrieveToken(userData)
      .then(data => {
        return userApi.getUser(data.user_id).then(user => {
          dispatch(getUserSuccess(user));
        });
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function updateUser(userId, name, email) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return userApi
      .updateUser(userId, name, email)
      .then(data => {
        dispatch(updateUserSuccess(name, email));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
