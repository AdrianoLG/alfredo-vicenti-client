import React from 'react';
import logo from '../../assets/images/logo.svg';

const FormHeader = () => (
  <div className='form-header'>
    <img id='logo' src={logo} alt='' />
    <h1>
      Biblioteca
      <br />
      Alfredo Vicenti
    </h1>
  </div>
);

export default FormHeader;
