import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const BookForm = ({ book, onSave, onChange, saving = false, errors = {} }) => {
  return (
    <>
      <h2>{book.id ? 'Editar' : 'Añadir'} libro</h2>
      <Form onSubmit={onSave} className='bookForm'>
        {errors.onSave && (
          <Message error>
            <p>{errors.onSave}</p>
          </Message>
        )}
        <div className='bookForm-fields'>
          <Form.Field
            control={Input}
            name='title'
            label='Título'
            required
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
            required
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
            required
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
          <Form.Field
            control={Input}
            type='number'
            name='pages'
            label='Páginas'
            placeholder='Escribe el número de páginas'
            value={book.pages || ''}
            min='0'
            onChange={onChange}
          />
        </div>
        <div className='buttons'>
          <NavLink to='/'>
            <Button>Cancelar</Button>
          </NavLink>
          <Button type='submit' disabled={saving} secondary>
            {saving ? 'Guardando...' : 'Guardar'}
          </Button>
        </div>
      </Form>
    </>
  );
};

BookForm.propTypes = {
  book: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default BookForm;
