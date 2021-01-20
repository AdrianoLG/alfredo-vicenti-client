import CryptoJS from 'crypto-js';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

import { saveUser } from '../../api/userApi';

function FinishRegistration({ history, location }) {
  useEffect(() => {
    const params = location.search;
    const token = params.substr(7, params.length);
    const bytes = CryptoJS.AES.decrypt(token, process.env.REACT_APP_SECRET);
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    registerUser(decrypted);
  });

  function registerUser(decrypted) {
    saveUser(decrypted)
      .then(() => {
        toast(`Usuario creado. Bienvenido ${decrypted.name}`);
        history.push('/login');
      })
      .catch(error => {
        toast(error.message);
      });
  }

  return <p>Finalizando registro...</p>;
}

export default FinishRegistration;
