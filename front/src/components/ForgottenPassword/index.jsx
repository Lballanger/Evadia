import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import './styles.scss';

const ForgottenPassword = () => (
  <>
    <Header />
    <div className="container">
      <div className="forgottenPassword__title">MOT DE PASSE OUBLIE</div>
      <div className="forgottenPassword">
        <form className="forgottenPassword__form">
          <div className="forgottenPassword__form__email">
            <p>Email</p>
            <input type="email" />
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

export default ForgottenPassword;
