import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.scss';

const Footer = () => (
  <footer className="footer">
    <p className="footer__p">©Copyright Evadia 2021. Tous droits réservés.</p>
    <p className="footer__mobile">©Evadia 2021.</p>
    <div className="footer__display">
      <NavLink className="footer__button" type="button" to="/contact">
        Contact
      </NavLink>
      <NavLink className="footer__button" type="button" to="/about">
        A propos
      </NavLink>
      <NavLink className="footer__button" type="button" to="/legals">
        Mentions légales
      </NavLink>
    </div>
  </footer>
);

export default Footer;
