import React from 'react';
import { Grid, Rating } from 'semantic-ui-react';

import './book.scss';

const Book = ({ book }) => (
  <div className='book'>
    <Grid>
      <Grid.Column mobile={16} tablet={11} computer={11} className='mt7'>
        <h2>{book.title}</h2>
        <h3>{book.author}</h3>
      </Grid.Column>
      <Grid.Column mobile={16} tablet={5} computer={5} className='mt7 mmt0'>
        <p className='right'>
          {book.editorial ? (
            <span class='italic mr1'>{book.editorial}</span>
          ) : (
            ''
          )}
          {book.pages ? <span>{book.pages} pág.</span> : ''}
        </p>
        <p className='category right'>{book.category}</p>
      </Grid.Column>
      <Grid.Column mobile={16} tablet={5} computer={5}>
        <div className='coverImg'>
          <img
            className='book-image'
            src={
              book.image !== null && book.image !== ''
                ? book.image
                : `${process.env.PUBLIC_URL}/img/old-book-cover.jpg`
            }
            alt=''
          />
          {book.image !== null && book.image !== '' ? (
            ''
          ) : (
            <p className='cover-title'>{book.title}</p>
          )}
        </div>
      </Grid.Column>
      <Grid.Column mobile={16} tablet={5} computer={5}>
        {book.synopsis ? (
          <div>
            <p>Sinopsis:</p>
            <p className='small'>{book.synopsis}</p>
          </div>
        ) : (
          ''
        )}
      </Grid.Column>
      <Grid.Column mobile={0} tablet={1} computer={1} className='mdn' />
      <Grid.Column mobile={16} tablet={5} computer={5}>
        {book.comments ? (
          <div className='mb1'>
            <p>Comentarios:</p>
            <p className='small'>{book.comments}</p>
          </div>
        ) : (
          ''
        )}
        {book.read_date ? (
          <p className='lh1'>
            Leído el {new Date(book.read_date).toLocaleDateString('es-ES')}
          </p>
        ) : (
          ''
        )}
        {book.rating ? (
          <Rating
            className='mb1'
            icon='star'
            value={book.rating}
            rating={book.rating}
            maxRating={10}
            disabled
          />
        ) : (
          ''
        )}
        {book.lent_to ? (
          <p className='lent-warn'>
            Prestado a {book.lent_to} el{' '}
            {new Date(book.lent_date).toLocaleDateString('es-ES')}
          </p>
        ) : (
          ''
        )}
      </Grid.Column>
    </Grid>
  </div>
);

export default Book;
