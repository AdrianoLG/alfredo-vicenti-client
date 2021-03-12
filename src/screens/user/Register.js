import CryptoJS from 'crypto-js';
import emailjs from 'emailjs-com';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Loader } from 'semantic-ui-react';

import RegisterForm from '../../components/user/RegisterForm';

const {
  REACT_APP_SECRET,
  REACT_APP_SERVICE_ID,
  REACT_APP_TEMPLATE_ID,
  REACT_APP_USER_ID
} = process.env;

function UserRegister({ history, ...props }) {
  const [registerForm, setRegisterForm] = useState({});
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setRegisterForm(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  }

  function formIsValid() {
    const { name, email, password } = registerForm;
    const errors = {};

    if (!name) errors.name = 'El nombre es necesario.';
    if (name && name.length > 30) errors.name = 'Límite de 30 caracteres';
    if (!email) errors.email = 'El email es necesario.';
    if (email && email.length > 50) errors.email = 'Límite de 50 caracteres';
    if (!password) errors.password = 'La contraseña es necesaria.';
    if (password && password.length > 60)
      errors.password = 'Límite de 60 caracteres';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    var ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(registerForm),
      REACT_APP_SECRET
    ).toString();
    const mailData = {
      ciphertext: ciphertext,
      name: registerForm.name,
      email: registerForm.email
    };
    emailjs
      .send(
        REACT_APP_SERVICE_ID,
        REACT_APP_TEMPLATE_ID,
        mailData,
        REACT_APP_USER_ID
      )
      .then(
        res => {
          toast('Revisa la bandeja de entrada de tu email', {
            autoClose: false
          });
          history.push('/login');
        },
        error => console.log('Error...', error)
      );
  }

  return (
    <>
      {props.loading ? (
        <div className='hundred'>
          <Loader active />
        </div>
      ) : (
        <RegisterForm
          user={registerForm}
          errors={errors}
          onChange={handleChange}
          onSave={handleSave}
          saving={saving}
        />
      )}
    </>
  );
}

export default UserRegister;
