import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.GET_USER_SUCCESS:
      return action.user.data;
    case types.CREATE_GROUP_SUCCESS:
      return {
        ...state,
        groups: state.groups.concat(action.savedGroup)
      };
    case types.DELETE_GROUP_SUCCESS:
      return {
        ...state,
        groups: state.groups.filter(group => group.id !== action.groupId)
      };
    default:
      return state;
  }
}
