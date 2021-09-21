import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.scss';

const Footer = () => (
  <footer className="footer">
    <p className="footer__p">©Copyright Evadia 2021. Tous droits réservés.</p>

    <div className="footer__display">
      <NavLink className="footer__button" type="button" to="/contact">
        Contact
      </NavLink>
      <NavLink className="footer__button" type="button" to="/about">
        A propos
      </NavLink>
      <button className="footer__button" type="button">
        Mentions légales
      </button>
    </div>
  </footer>
);

export default Footer;
