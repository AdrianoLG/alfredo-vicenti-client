import { combineReducers } from 'redux';
import book from './bookReducer';
import books from './booksReducer';
import apiCallsInProgress from './apiStatusReducer';

const rootReducer = combineReducers({
  book,
  books,
  apiCallsInProgress
});

export default rootReducer;
