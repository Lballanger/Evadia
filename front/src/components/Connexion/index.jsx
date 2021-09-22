import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

import './styles.scss';

const Connexion = () => (
  <>
    <Header />
    <div className="connexion">
      <div className="connexion__title">CONNEXION</div>
      <form className="connexion__form">
        <div className="connexion__form__email">
          <p>Email</p>
          <input type="email" />
        </div>
        <div className="connexion__form__password">
          <p>Mot de passe</p>
          <input type="password" />
        </div>
        <div className="connexion__form__remember">
          <input
            className="connexion__form__remember__checkbox"
            type="checkbox"
          />
          <span className="connexion__form__remember__title">
            Se souvenir de moi
          </span>
        </div>
        <div className="connexion__form__submit">
          <button type="submit">Se connecter</button>
        </div>
        <div className="connexion__form__forgottenPassword">
          Mot de passe oublié
        </div>
      </form>
    </div>
    <Footer />
  </>
);

export default Connexion;
