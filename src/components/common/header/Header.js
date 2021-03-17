import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import logo from '../../../assets/images/logo.svg';
import { resetBook } from '../../../redux/actions/bookActions';
import './header.scss';
import MenuDropdown from './MenuDropdown';

function Header({ user, resetBook }) {
  return (
    <header className='top-bar'>
      <div className='mainContainer height-pad flex-center-between'>
        <div>
          <NavLink to='/' className='brand' onClick={() => resetBook()}>
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

const mapDispatchToProps = { resetBook };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
