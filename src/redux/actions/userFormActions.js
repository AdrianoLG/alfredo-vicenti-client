import * as types from './actionTypes';
import * as userApi from '../../api/userApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function getUserSuccess(user) {
  return { type: types.GET_USER_SUCCESS, user };
}

export function getFormData(userData) {
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
