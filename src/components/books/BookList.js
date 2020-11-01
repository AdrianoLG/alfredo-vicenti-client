import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BookList = ({ books }) => (
  <React.Fragment>
    {books.map(book => {
      return (
        <Link to={'/libro/' + book.id} className='card'>
          <div>
            <p className='card-title'>{book.title}</p>
            <p className='card-author'>{book.author}</p>
          </div>
          <div>
            <p className='card-category'>{book.category}</p>
          </div>
        </Link>
      );
    })}
  </React.Fragment>
);

BookList.propTypes = {
  books: PropTypes.array.isRequired
};

export default BookList;
