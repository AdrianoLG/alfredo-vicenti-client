import React from 'react';
import PropTypes from 'prop-types';

const BookDetail = ({ book }) => (
  <React.Fragment>
    <p>Autor: {book.author}</p>
    <p>Título: {book.title}</p>
    <p>Categoría: {book.category}</p>
    <p>Páginas: {book.pages}</p>
    <p>Editorial: {book.editorial}</p>
  </React.Fragment>
);

BookDetail.propTypes = {
  book: PropTypes.object.isRequired
};

export default BookDetail;
