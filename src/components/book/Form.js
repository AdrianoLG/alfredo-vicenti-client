import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Message, Radio, Rating } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

function BookForm({ book, onSave, onChange, saving = false, errors = {} }) {
  const [read, setRead] = useState(false);
  const [lent, setLent] = useState(false);
  const [rating, setRating] = useState(0);
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
    } else {
      setRead(false);
      setLent(false);
      setRating(null);
    }
  }, [book.id, book.read_date, book.lent_date, book.rating]);

  function handleRate(e, { rating }) {
    setRating(rating);
    book.rating = rating;
  }

  function handleReadRadio(type) {
    setRead(!read);
    if (read) {
      book.read_date = null;
    }
  }

  function handleLentRadio() {
    setLent(!lent);
    if (lent) {
      book.lent_date = null;
    }
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
        <div className='book-form_fields'>
          <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              name='title'
              label='Título'
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
              label='Autor'
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
              label='Categoría'
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
            />
            <Form.Field></Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.TextArea
              name='synopsis'
              label='Sinopsis'
              placeholder='Escribe la sinopsis'
              value={book.synopsis || ''}
              onChange={onChange}
            />
            <Form.Field
              control={Input}
              type='file'
              name='image'
              label='Portada'
              value={book.image || ''}
              onChange={onChange}
              fluid
            />
            <Form.Field></Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field>
              <Radio checked={read} toggle onClick={handleReadRadio} />
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
          <Form.Group>
            <Form.Field>
              <Radio checked={lent} toggle onClick={handleLentRadio} />
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
        </div>
        <div className='buttons'>
          {book.id ? (
            <Button
              onClick={() => {
                history.push(`/libro/${book.id}`);
              }}
            >
              Cancelar
            </Button>
          ) : (
            <Button
              onClick={() => {
                history.push('/');
              }}
            >
              Cancelar
            </Button>
          )}
          <Button type='submit' disabled={saving} secondary>
            {saving ? 'Guardando...' : 'Guardar'}
          </Button>
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
