import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './styles.scss';

const Header = () => {
  const [showLinks, setShowLinks] = useState(false);

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <header className={`header ${showLinks ? 'show-nav' : 'hide-nav'} `}>
      <NavLink className="header__logo__button" type="button" to="/">
        <img src={logo} className="header__logo" alt="Logo Evadia" />
        <h1 className="header__h1">
          <strong>Evadia</strong>
        </h1>
      </NavLink>

      <ul className="header__links">
        <li className="header__item slideInDown-1">
          <NavLink className="header__link" type="button" to="/connexion">
            Connexion
          </NavLink>
        </li>
        <li className="header__item slideInDown-2">
          <NavLink className="header__link" type="button" to="/inscription">
            Inscription
          </NavLink>
        </li>
      </ul>
      <button
        className="header__burger"
        type="button"
        onClick={handleShowLinks}
      >
        <span className="burger-bar" />
      </button>
    </header>
  );
};

export default Header;
