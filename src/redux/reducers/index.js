import { combineReducers } from 'redux';
import book from './bookReducer';
import books from './booksReducer';

const rootReducer = combineReducers({
  book,
  books
});

export default rootReducer;
