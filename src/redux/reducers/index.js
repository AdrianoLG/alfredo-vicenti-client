import { combineReducers } from 'redux';

import apiCallsInProgress from './apiStatusReducer';
import book from './bookReducer';
import books from './booksReducer';
import user from './userReducer';
import userForm from './userFormReducer';
import name from './nameReducer';

const rootReducer = combineReducers({
  apiCallsInProgress,
  book,
  books,
  user,
  userForm,
  name
});

export default rootReducer;
