import React from 'react';
import './header.scss';
import logo from '../../assets/images/logo.svg';
import menu from '../../assets/images/menu.svg';
import settings from '../../assets/images/settings.svg';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header className="top-bar">
        <div className="container">
            <div className="top-bar-left">
                <NavLink to="/" className="brand">
                    <img id="logo" src={logo} alt="" />
                    <h1>Biblioteca<br /><span className="subheader">Alfredo Vicenti</span></h1>
                </NavLink>
            </div>
            <div className="top-bar-right">
                <NavLink to="/" class="menu"><img id="menu" src={menu} alt="Menú" /></NavLink>
                <div className="user">
                    <div className="user-data">
                        <p>Adriano</p>
                        <NavLink to="/" id="disconnect">Desconectar</NavLink>
                    </div>
                    <NavLink to="/"><img id="settings" src={settings} alt="Opciones" /></NavLink>
                </div>
            </div>
        </div>
    </header>
);

export default Header;
