import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './styles.scss';

const Header = () => (
  <header className="header">
    <NavLink className="header__logo__button" type="button" to="/">
      <img src={logo} className="header__logo" alt="Logo Evadia" />
      <h1 className="header__h1">
        <strong>Evadia</strong>
      </h1>
    </NavLink>

    <div className="header__button__display">
      <NavLink className="header__button" type="button" to="/connexion">
        Connexion
      </NavLink>
      <NavLink className="header__button" type="button" to="/inscription">
        Inscription
      </NavLink>
    </div>
  </header>
);

export default Header;
