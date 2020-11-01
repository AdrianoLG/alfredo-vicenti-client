import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BookList = ({ books }) => (
  <div className='card'>
    {books.map(book => {
      return (
        <Link to={'/libro/' + book.id}>
          <p className='title'>{book.title}</p>
          <p className='author'>{book.author}</p>
          <p className='category'>{book.category}</p>
        </Link>
      );
    })}
  </div>
);

BookList.propTypes = {
  books: PropTypes.array.isRequired
};

export default BookList;
