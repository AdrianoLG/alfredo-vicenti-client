import { combineReducers } from 'redux';

import apiCallsInProgress from './apiStatusReducer';
import book from './bookReducer';
import books from './booksReducer';
import chosenGroup from './groupReducer';
import name from './nameReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  apiCallsInProgress,
  book,
  books,
  user,
  name,
  chosenGroup
});

export default rootReducer;
