import React from 'react';

const Book = ({ book }) => (
  <>
    <p>Autor: {book.author}</p>
    <p>Título: {book.title}</p>
    <p>Categoría: {book.category}</p>
    <p>Páginas: {book.pages}</p>
    <p>Editorial: {book.editorial}</p>
  </>
);

export default Book;
