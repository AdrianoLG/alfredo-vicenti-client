import React from 'react';
import { Grid } from 'semantic-ui-react';

const Book = ({ book }) => (
  <div className='book'>
    <Grid>
      <Grid.Column mobile={16} tablet={5} computer={5} className='height-pad'>
        <img
          className='book-image'
          src={
            book.image !== null
              ? book.image
              : 'https://placeimg.com/640/850/people'
          }
          alt=''
        />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={5} computer={5} className='height-pad'>
        <p>Autor: {book.author}</p>
        <p>Título: {book.title}</p>
        <p>Categoría: {book.category}</p>
        <p>Páginas: {book.pages}</p>
        <p>Editorial: {book.editorial}</p>
      </Grid.Column>
      <Grid.Column mobile={16} tablet={5} computer={5} className='height-pad'>
        <p>Sinopsis: {book.synopsis}</p>
        <p>Leído en: {book.read_date}</p>
        <p>Puntuación: {book.rating}</p>
        <p>Comentarios: {book.comments}</p>
        {book.lent_to ? (
          <p>
            Prestado a: {book.lent_to} ({book.lent_date})
          </p>
        ) : (
          ''
        )}
      </Grid.Column>
    </Grid>
  </div>
);

export default Book;
