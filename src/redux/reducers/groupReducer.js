import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function groupReducer(state = initialState.chosenGroup, action) {
  switch (action.type) {
    case types.CHOSEN_GROUP_SUCCESS:
      console.log('hey');
      return action;
    default:
      return state;
  }
}
