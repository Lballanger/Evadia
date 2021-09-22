/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { NavLink } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import './styles.scss';

const Inscription = () => (
  <>
    <Header />
    <div className="inscription">
      <div className="inscription__title">INSCRIPTION</div>
      <form className="inscription__form">
        <div className="inscription__form__lastname">
          <p>Nom</p>
          <input type="text" />
        </div>
        <div className="inscription__form__firstname">
          <p>Prénom</p>
          <input type="text" />
        </div>
        <div className="inscription__form__city">
          <p>Ville</p>
          <input type="text" />
        </div>
        <div className="inscription__form__email">
          <p>Email</p>
          <input type="email" />
        </div>
        <div className="inscription__form__password">
          <p>Mot de passe</p>
          <input type="password" />
        </div>
        <div className="inscription__form__confirm">
          <p>Confirmation du mot de passe</p>
          <input type="password" />
        </div>
        <div className="inscription__form__readLegals">
          <input
            className="inscription__form__readLegals__checkbox"
            type="checkbox"
          />
          <span className="inscription__form__readLegals__title">
            J'ai lu les
            <NavLink
              className="inscription__form__readLegals__link"
              type="button"
              to="/legals"
            >
              CGU
            </NavLink>
          </span>
        </div>

        <div className="inscription__form__alreadyAccount">
          <span className="inscription__form__alreadyAccount__title">
            J'ai déjà un compte,
          </span>
          <NavLink
            className="inscription__form__alreadyAccount__link"
            type="button"
            to="/connexion"
          >
            Je me connecte
          </NavLink>
        </div>
        <div className="inscription__form__alreadyAccount__submit">
          <button type="submit">S'inscrire</button>
        </div>
      </form>
    </div>
    <Footer />
  </>
);

export default Inscription;
