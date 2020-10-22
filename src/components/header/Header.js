import React from 'react';
import './header.scss';
import logo from '../../assets/images/logo.svg';
import menu from '../../assets/images/menu.svg';
import settings from '../../assets/images/settings.svg';

const Header = () => (
    <header className="top-bar">
        <div className="top-bar-container">
            <div className="top-bar-left">
                <a href="#" className="brand">
                    <img id="logo" src={logo} alt="" />
                    <h1>Biblioteca<br /><span className="subheader">Alfredo Vicenti</span></h1>
                </a>
            </div>
            <div className="top-bar-right">
                <a href="#" class="menu"><img id="menu" src={menu} alt="Menú" /></a>
                <div className="user">
                    <div className="user-data">
                        <p>Adriano</p>
                        <a href="#" id="disconnect">Desconectar</a>
                    </div>
                    <a href="#"><img id="settings" src={settings} alt="Opciones" /></a>
                </div>
            </div>
        </div>
    </header>
);

export default Header;
