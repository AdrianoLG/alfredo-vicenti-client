import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import Header from '../../components/common/header/Header';

const BookManage = () => (
  <React.Fragment>
    <Header />
    <div className='main-container height-pad'>
      <h1>Crear libro</h1>
      <NavLink to='/'>
        <Button>Cancelar</Button>
      </NavLink>
      <NavLink to='/'>
        <Button primary>Editar</Button>
      </NavLink>
    </div>
  </React.Fragment>
);

export default BookManage;
