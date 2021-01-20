import { combineReducers } from 'redux';

import apiCallsInProgress from './apiStatusReducer';
import book from './bookReducer';
import books from './booksReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  book,
  books,
  user,
  apiCallsInProgress
});

export default rootReducer;
