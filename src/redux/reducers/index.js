import { combineReducers } from 'redux';
import book from './bookReducer';
import books from './booksReducer';
import user from './userReducer';
import apiCallsInProgress from './apiStatusReducer';

const rootReducer = combineReducers({
  book,
  books,
  user,
  apiCallsInProgress
});

export default rootReducer;
