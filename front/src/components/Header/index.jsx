import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import useWindowSize from '../../hooks/useWindowSize';
import userStore from '../../store/user';
import './styles.scss';

const Header = () => {
  const { isMobile } = useWindowSize();
  const user = userStore(state => state.user);
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

      {!isMobile ? (
        <ul className="header__links">
          {user ? (
            <>
              <NavLink className="header__link" type="button" to="/account">
                <div className="header__links__display">
                  <li className="header__item slideInDown-2">
                    Bonjour {user.firstname}
                  </li>
                </div>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink className="header__link" type="button" to="/connexion">
                <div className="header__links__display">
                  <li className="header__item slideInDown-1">Connexion</li>
                </div>
              </NavLink>

              <NavLink className="header__link" type="button" to="/inscription">
                <div className="header__links__display">
                  <li className="header__item slideInDown-2">Inscription</li>
                </div>
              </NavLink>
            </>
          )}
        </ul>
      ) : (
        <button
          className="header__burger"
          type="button"
          onClick={handleShowLinks}
        >
          <span className="burger-bar" />
        </button>
        // Ici le menu mobile qui sera en position fixed, le state de showLinks sera utilisé pour le toggle de celui-ci uniquement
      )}
    </header>
  );
};

export default Header;
