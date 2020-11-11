import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const BookForm = ({ book, onSave, onChange, saving = false, errors = {} }) => {
  return (
    <>
      <h2>{book.id ? 'Editar' : 'Añadir'} libro</h2>
      <form onSubmit={onSave} className='bookForm'>
        {errors.onSave && (
          <div className='alert alert-danger' role='alert'>
            {errors.onSave}
          </div>
        )}
        <div className='bookForm-fields'>
          <Input
            name='title'
            label='Título'
            value={book.title || ''}
            onChange={onChange}
            error={errors.title}
          />
          <br />
          <Input
            name='author'
            label='Autor'
            value={book.author || ''}
            onChange={onChange}
            error={errors.author}
          />
          <br />
          <Input
            name='category'
            label='Categoría'
            value={book.category || ''}
            onChange={onChange}
            error={errors.category}
          />
          <br />
          <Input
            type='number'
            min='0'
            name='pages'
            label='Páginas'
            value={book.pages || ''}
            onChange={onChange}
            error={errors.pages}
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
      </form>
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
