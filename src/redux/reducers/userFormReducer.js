import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userFormReducer(state = initialState.userForm, action) {
  switch (action.type) {
    case types.FORM_USER_SUCCESS:
      return action.data;
    default:
      return state;
  }
}
