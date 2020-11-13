import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/images/logo.svg';
import './header.scss';
import MenuDropdown from './MenuDropdown';

const Header = () => (
  <header className='top-bar'>
    <div className='main-container height-pad flex-center-between'>
      <div>
        <NavLink to='/' className='brand'>
          <img id='logo' src={logo} alt='' />
          <h1>
            Biblioteca
            <br />
            <span className='subheader'>Alfredo Vicenti</span>
          </h1>
        </NavLink>
      </div>
      <div>
        <div className='user'>
          <p>Adriano</p>
          <MenuDropdown />
        </div>
      </div>
    </div>
  </header>
);

export default Header;
