import React from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';

function LoginForm({ user, onSave, onChange, saving = false, errors = {} }) {
  return (
    <div className='form-background'>
      <Form onSubmit={onSave} className='login-form'>
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
                  ? { content: errors.email, pointing: 'below' }
                  : false
              }
            ></Form.Field>
            <div className='buttons'>
              <Button type='submit' disabled={saving} secondary>
                {saving ? 'Entrando...' : 'Entrar'}
              </Button>
              {/* <Button
                onClick={() => {
                  console.log('Form click');
                }}
              >
                Entrar
              </Button> */}
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default LoginForm;
