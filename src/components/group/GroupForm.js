import React from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';

import { colors } from './groupColors';

function GroupForm({ group, onSave, onChange, saving = false, errors = {} }) {
  function handleClick(e) {
    group.color = e.target.dataset.color;
    if (document.querySelectorAll('.selected').length > 0) {
      document.querySelectorAll('.selected')[0].classList.remove('selected');
    }
    e.target.classList.add('selected');
  }

  return (
    <>
      <h2>Crear grupo</h2>
      <Form onSubmit={onSave} className='group-form'>
        {errors.onSave && (
          <Message error>
            <p>{errors.onSave}</p>
          </Message>
        )}
        <div className='addGroup'>
          <div className='book-form_fields'>
            <Form.Field
              control={Input}
              name='name'
              label='Nombre'
              placeholder='Escribe el nombre del grupo'
              value={group.name || ''}
              onChange={onChange}
              fluid
              error={
                errors.name
                  ? { content: errors.name, pointing: 'below' }
                  : false
              }
            ></Form.Field>
            <Form.Group>
              <Form.Field
                error={
                  errors.color
                    ? { content: errors.color, pointing: 'below' }
                    : false
                }
              >
                <label>Colores</label>
                {errors.color ? (
                  <div
                    className='ui pointing below prompt label'
                    role='alert'
                    aria-atomic='true'
                  >
                    {errors.color}
                  </div>
                ) : (
                  ''
                )}
                <div className='colors'>
                  {colors.map(color => (
                    <div
                      key={color.class}
                      className={color.class}
                      data-color={color.color}
                      onClick={handleClick}
                    ></div>
                  ))}
                </div>
              </Form.Field>
            </Form.Group>
            <div className='buttons flex-end'>
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

export default GroupForm;
