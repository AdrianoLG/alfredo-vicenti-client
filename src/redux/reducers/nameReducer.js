import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function nameReducer(state = initialState.name, action) {
  switch (action.type) {
    case types.GET_NAME_SUCCESS:
      return action.name;
    default:
      return state;
  }
}
