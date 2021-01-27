import * as types from './actionTypes';
import * as userApi from '../../api/userApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function userFormSuccess(data) {
  return { type: types.FORM_USER_SUCCESS, data };
}

export function getFormData(userData) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return userApi
      .userDataToRetrieveToken(userData)
      .then(data => {
        dispatch(userFormSuccess(data));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
