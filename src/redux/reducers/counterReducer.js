import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function counterReducer(state = initialState.counter, action) {
  switch (action.type) {
    case types.SAVE_COUNTER:
      return action.counter;
    default:
      return state;
  }
}
