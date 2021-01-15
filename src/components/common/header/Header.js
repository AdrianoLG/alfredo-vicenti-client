import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import logo from '../../../assets/images/logo.svg';
import './header.scss';
import MenuDropdown from './MenuDropdown';

function Header({ user }) {
  useEffect(() => {}, [user]);

  return (
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
            <p>{user ? user.name : 'Anónimo'}</p>
            <MenuDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
