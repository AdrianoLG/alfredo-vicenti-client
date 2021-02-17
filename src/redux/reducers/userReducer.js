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
    case types.CHANGE_GROUP_COLOR_SUCCESS:
      return {
        ...state,
        groups: state.groups.map(group =>
          group.id === action.groupId
            ? group.users.map(user =>
                user.pivot.user_id === action.userId
                  ? {
                      ...group,
                      users: [
                        {
                          ...user,
                          pivot: { ...user.pivot, color: action.color }
                        }
                      ]
                    }
                  : group
              )[0]
            : group
        )
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
