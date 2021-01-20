import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, Input, Message } from 'semantic-ui-react';

import FormHeader from './FormHeader';

function LoginForm({ user, onSave, onChange, saving = false, errors = {} }) {
  const history = useHistory();
  return (
    <div className='form-background'>
      <Form onSubmit={onSave} className='login-form'>
        <FormHeader />
        {errors.onSave && (
          <Message error>
            <p>{errors.onSave}</p>
          </Message>
        )}
        <div className='addUser'>
          <div className='user-form_fields'>
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
                  history.push('/registro');
                }}
              >
                Registrarse
              </Button>
              <Button type='submit' disabled={saving} secondary>
                {saving ? 'Entrando...' : 'Entrar'}
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default LoginForm;
