import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../public/logo.png';
import './styles.scss';

const Header = () => (
  <header className="header">
    <NavLink className="header__logo__button" type="button" to="/">
      <img src={logo} className="header__logo" alt="Logo Evadia" />
    </NavLink>
    <h1 className="header__h1">
      <strong>Evadia</strong>
    </h1>
    <div className="header__button__display">
      <button className="header__button" type="button">
        Connexion
      </button>
      <button className="header__button" type="button">
        Inscription
      </button>
    </div>
  </header>
);

export default Header;
