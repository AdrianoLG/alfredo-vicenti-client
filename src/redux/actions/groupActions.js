import * as types from './actionTypes';
import { beginApiCall } from './apiStatusActions';

export function chosenGroupSuccess(group) {
  return { type: types.CHOSEN_GROUP_SUCCESS, group };
}

export function chooseGroup(group) {
  return function (dispatch) {
    dispatch(beginApiCall());
    dispatch(chosenGroupSuccess(group));
  };
}
