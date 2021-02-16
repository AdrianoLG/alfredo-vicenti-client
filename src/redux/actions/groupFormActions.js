import * as types from './actionTypes';
import * as groupApi from '../../api/groupApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function createGroupSuccess(savedGroup) {
  return { type: types.CREATE_GROUP_SUCCESS, savedGroup };
}

export function deleteGroupSuccess(groupId) {
  return { type: types.DELETE_GROUP_SUCCESS, groupId };
}

export function saveGroup(group, userColor, userName) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return groupApi
      .saveGroup(group, userColor, userName)
      .then(savedGroup => {
        dispatch(createGroupSuccess(savedGroup));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteGroup(groupId, adminId) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return groupApi.deleteGroup(groupId, adminId).then(() => {
      dispatch(deleteGroupSuccess(groupId));
    });
  };
}
