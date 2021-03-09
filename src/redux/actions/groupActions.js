import * as types from './actionTypes';
import * as groupApi from '../../api/groupApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function chosenGroupSuccess(group) {
  return { type: types.CHOSEN_GROUP_SUCCESS, group };
}

export function createGroupSuccess(savedGroup) {
  return { type: types.CREATE_GROUP_SUCCESS, savedGroup };
}

export function changeGroupColorSuccess(groupId, userId, color) {
  return { type: types.CHANGE_GROUP_COLOR_SUCCESS, groupId, userId, color };
}

export function deleteGroupUserSuccess(groupId, userId) {
  return { type: types.DELETE_GROUP_USER_SUCCESS, groupId, userId };
}

export function deleteGroupSuccess(groupId) {
  return { type: types.DELETE_GROUP_SUCCESS, groupId };
}

export function chooseGroup(group) {
  return function (dispatch) {
    dispatch(beginApiCall());
    dispatch(chosenGroupSuccess(group));
  };
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

export function changeGroupColor(groupId, userId, color) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return groupApi
      .changeGroupColor(groupId, userId, color)
      .then(savedGroup => {
        dispatch(changeGroupColorSuccess(groupId, userId, color));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteGroupUser(groupId, userId) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return groupApi.deleteGroupUser(groupId, userId).then(() => {
      dispatch(deleteGroupUserSuccess(groupId, userId));
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
