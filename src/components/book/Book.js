import React from 'react';

const Book = ({ book }) => (
  <React.Fragment>
    <p>Autor: {book.author}</p>
    <p>Título: {book.title}</p>
    <p>Categoría: {book.category}</p>
    <p>Páginas: {book.pages}</p>
    <p>Editorial: {book.editorial}</p>
  </React.Fragment>
);

export default Book;
