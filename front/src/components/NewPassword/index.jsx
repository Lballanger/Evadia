import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

import './styles.scss';

const NewPassword = () => (
  <>
    <Header />
    <div className="container">
      <div className="newPassword">
        <div className="newPassword__title">NOUVEAU MOT DE PASSE</div>
        <form className="newPassword__form">
          <div className="newPassword__form__password">
            <p>Mot de passe</p>
            <input type="password" />
          </div>
          <div className="newPassword__form__confirm">
            <p>Confirmation du mot de passe</p>
            <input type="password" />
          </div>
          <div className="newPassword__form__submit">
            <button type="submit">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
    <Footer />
  </>
);

export default NewPassword;
