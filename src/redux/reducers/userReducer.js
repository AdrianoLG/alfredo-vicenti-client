import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.GET_USER_SUCCESS:
      console.log(action.user.data);
      return action.user.data;
    default:
      return state;
  }
}
