import CryptoJS from 'crypto-js';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Button, Form, Input, Message } from 'semantic-ui-react';

import { updateUserPassword } from '../../api/userApi';
import BoxHeader from '../../components/user/BoxHeader';

function ChangePassword({ location }) {
  const history = useHistory();
  const [pass, setPass] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [decrypted, setDecrypted] = useState('');

  useEffect(() => {
    const params = location.search;
    const token = params.substr(7, params.length);
    const bytes = CryptoJS.AES.decrypt(token, process.env.REACT_APP_SECRET);
    setDecrypted(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)));
  }, [location.search]);

  function formIsValid() {
    const errors = {};

    if (!pass) errors.password = 'La contraseña es necesaria.';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleChange(event) {
    const { value } = event.target;
    setPass(value);
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    updateUserPassword(decrypted.userId, pass, decrypted.token)
      .then(() => {
        toast('Contraseña cambiada');
        setSaving(false);
        history.push('/login');
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return (
    <div className='main-background'>
      <div className='centered-box'>
        <BoxHeader />
        <h2>Cambiar contraseña</h2>
        <Form onSubmit={handleSave} className='group-form'>
          {errors.handleSave && (
            <Message error>
              <p>{errors.handleSave}</p>
            </Message>
          )}
          <div className='newPassword'>
            <div className='newPassword-form_fields'>
              <Form.Field
                control={Input}
                type='password'
                name='password'
                label='Contraseña'
                placeholder='Escribe la contraseña'
                value={pass || ''}
                onChange={handleChange}
                fluid
                error={
                  errors.password
                    ? { content: errors.password, pointing: 'below' }
                    : false
                }
              ></Form.Field>
            </div>
          </div>
          <div className='buttons mb7'>
            <Button type='submit' disabled={saving} secondary>
              {saving ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ChangePassword;
