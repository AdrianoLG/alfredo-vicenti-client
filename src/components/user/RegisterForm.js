import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, Input, Message } from 'semantic-ui-react';

import BoxHeader from './BoxHeader';

function RegisterForm({ user, onSave, onChange, saving = false, errors = {} }) {
  const history = useHistory();
  return (
    <div className='main-background'>
      <Form onSubmit={onSave} className='centered-box' autoComplete='off'>
        <BoxHeader />
        {errors.onSave && (
          <Message error>
            <p>{errors.onSave}</p>
          </Message>
        )}
        <div className='addUser'>
          <div className='user-form_fields'>
            <Form.Field
              control={Input}
              name='name'
              label='Nombre'
              placeholder='Escribe el nombre'
              value={user.name || ''}
              onChange={onChange}
              fluid
              error={
                errors.name
                  ? { content: errors.name, pointing: 'below' }
                  : false
              }
            ></Form.Field>
            <Form.Field
              control={Input}
              name='email'
              label='Email'
              placeholder='Escribe el email'
              value={user.email || ''}
              onChange={onChange}
              fluid
              error={
                errors.email
                  ? { content: errors.email, pointing: 'below' }
                  : false
              }
            ></Form.Field>
            <Form.Field
              control={Input}
              type='password'
              name='password'
              label='Contraseña'
              placeholder='Escribe la contraseña'
              value={user.password || ''}
              onChange={onChange}
              fluid
              error={
                errors.password
                  ? { content: errors.password, pointing: 'below' }
                  : false
              }
            ></Form.Field>
            <div className='buttons'>
              <Button
                onClick={() => {
                  history.push('/login');
                }}
              >
                Volver
              </Button>
              <Button type='submit' disabled={saving} secondary>
                {saving ? 'Registrando...' : 'Aceptar'}
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default RegisterForm;
