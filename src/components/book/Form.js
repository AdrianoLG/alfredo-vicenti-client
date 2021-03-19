import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import FileBase64 from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Form,
  Icon,
  Input,
  Message,
  Radio,
  Rating
} from 'semantic-ui-react';

import './form.scss';

function BookForm({
  book,
  user,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) {
  const [read, setRead] = useState(false);
  const [lent, setLent] = useState(false);
  const [rating, setRating] = useState(0);
  const [cover, setCover] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (book.id) {
      if (book.read_date !== null) {
        setRead(true);
      }
      if (book.lent_date !== null) {
        setLent(true);
      }
      if (book.rating !== null) {
        setRating(book.rating);
      }
      if (book.image !== null) {
        setCover(book.image);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleRate(e, { rating }) {
    setRating(rating);
    book.rating = rating;
  }

  function handleReadRadio(type) {
    if (read === false) {
      setRead(true);
    } else {
      setRead(false);
      setRating(0);
      book.rating = null;
      book.read_date = null;
    }
  }

  function handleLentRadio() {
    setLent(!lent);
    if (lent) {
      book.lent_date = null;
    }
  }

  function handleCover(coverFile) {
    setCover(coverFile.base64);
    book.image = coverFile.base64;
  }

  function handleDeleteCover() {
    setCover('');
    book.image = '';
  }

  return (
    <>
      <h2>{book.id ? 'Editar' : 'Añadir'} libro</h2>
      <Form onSubmit={onSave} className='book-form'>
        {errors.onSave && (
          <Message error>
            <p>{errors.onSave}</p>
          </Message>
        )}
        <div className='addBook'>
          <div className='cover'>
            <div className='coverImg'>
              <img
                src={
                  cover !== ''
                    ? cover
                    : `${process.env.PUBLIC_URL}/img/old-book-cover.jpg`
                }
                alt='Portada'
              />
              {cover !== '' ? (
                <Icon
                  className='closeIcon'
                  name='close'
                  link
                  onClick={handleDeleteCover}
                />
              ) : (
                <p className='cover-title'>{book.title}</p>
              )}
            </div>
            <div className='field mb7'>
              <label>Imagen</label>
              <FileBase64 multiple={false} onDone={e => handleCover(e)} />
            </div>
          </div>
          <div className='book-form_fields'>
            <Form.Group widths='equal'>
              <Form.Field
                control={Input}
                name='title'
                label='Título*'
                placeholder='Escribe el título'
                value={book.title || ''}
                onChange={onChange}
                fluid
                error={
                  errors.title
                    ? { content: errors.title, pointing: 'below' }
                    : false
                }
              ></Form.Field>
              <Form.Field
                control={Input}
                name='author'
                label='Autor*'
                placeholder='Escribe el autor'
                value={book.author || ''}
                onChange={onChange}
                fluid
                error={
                  errors.author
                    ? { content: errors.author, pointing: 'below' }
                    : false
                }
              />
              <Form.Field
                control={Input}
                name='category'
                label='Categoría*'
                placeholder='Escribe la categoría'
                value={book.category || ''}
                onChange={onChange}
                fluid
                error={
                  errors.category
                    ? { content: errors.category, pointing: 'below' }
                    : false
                }
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field
                control={Input}
                type='number'
                name='pages'
                label='Páginas'
                placeholder='Escribe el número de páginas'
                value={book.pages || ''}
                min='0'
                onChange={onChange}
                fluid
              />
              <Form.Field
                control={Input}
                name='editorial'
                label='Editorial'
                placeholder='Escribe la editorial'
                value={book.editorial || ''}
                onChange={onChange}
                fluid
                error={
                  errors.editorial
                    ? { content: errors.editorial, pointing: 'below' }
                    : false
                }
              />
              <Form.Field className='mobileHidden'></Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.TextArea
                name='synopsis'
                label='Sinopsis'
                placeholder='Escribe la sinopsis'
                value={book.synopsis || ''}
                onChange={onChange}
              />
              <Form.Field className='mobileHidden'></Form.Field>
              <Form.Field className='mobileHidden'></Form.Field>
            </Form.Group>
            <Form.Group className='mmb'>
              <Form.Field className='flex-center'>
                <Radio
                  checked={read}
                  toggle
                  onClick={handleReadRadio}
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      setRead(!read);
                    }
                  }}
                  label={{ tabIndex: 0 }}
                />
                <span>{read ? 'Leído' : 'No leído'}</span>
              </Form.Field>
            </Form.Group>
            {read ? (
              <Form.Group widths='equal'>
                <Form.TextArea
                  name='comments'
                  label='Comentarios'
                  placeholder='Escribe los comentarios'
                  value={book.comments || ''}
                  onChange={onChange}
                />
                <Form.Field
                  control={Input}
                  type='date'
                  name='read_date'
                  label='Fecha de lectura'
                  value={book.read_date || ''}
                  onChange={onChange}
                  fluid
                />
                <Form.Field
                  control={Input}
                  className='hidden'
                  type='number'
                  min='0'
                  max='10'
                  name='rating'
                  value={book.rating || ''}
                  onChange={onChange}
                  fluid
                />
                <div className='field'>
                  <label>Puntuación</label>
                  <div className='ui fluid input centered'>
                    <Rating
                      icon='star'
                      rating={rating}
                      value={rating}
                      maxRating={10}
                      onRate={handleRate}
                      clearable
                    />
                    <span>{rating || '-'}</span>
                  </div>
                </div>
              </Form.Group>
            ) : (
              ''
            )}
            <Form.Group className='mmb'>
              <Form.Field className='flex-center'>
                <Radio
                  checked={lent}
                  toggle
                  onClick={handleLentRadio}
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      setLent(!lent);
                    }
                  }}
                  label={{ tabIndex: 0 }}
                />
                <span>{lent ? 'Prestado' : 'No prestado'}</span>
              </Form.Field>
            </Form.Group>
            {lent ? (
              <Form.Group widths='equal'>
                <Form.Field
                  control={Input}
                  name='lent_to'
                  label='Prestado a'
                  placeholder='Escribe a quién se prestó el libro'
                  value={book.lent_to || ''}
                  onChange={onChange}
                  fluid
                />
                <Form.Field
                  control={Input}
                  type='date'
                  name='lent_date'
                  label='Fecha de préstamo'
                  value={book.lent_date || ''}
                  onChange={onChange}
                  fluid
                />
                <Form.Field />
              </Form.Group>
            ) : (
              ''
            )}
            <div className='buttons mt7'>
              {book.id ? (
                <Button
                  onClick={() => {
                    history.push(`/libro/${book.id}/usuario/${user.id}`);
                  }}
                >
                  Volver
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    book = null;
                    history.push('/');
                  }}
                >
                  Volver
                </Button>
              )}
              <Button type='submit' disabled={saving} secondary>
                {saving ? 'Guardando...' : 'Guardar'}
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
}

BookForm.propTypes = {
  book: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default BookForm;
