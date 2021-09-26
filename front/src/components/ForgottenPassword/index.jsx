import React from 'react';
import './styles.scss';

const ForgottenPassword = () => (
  <div className="container">
    <div className="forgottenPassword__title">Mot de passe oublié</div>
    <div className="forgottenPassword">
      <form className="forgottenPassword__form">
        <div className="forgottenPassword__form__email">
          <p>Email</p>
          <input type="email" />
        </div>
        <div className="newPassword__form__submit">
          <button type="submit" className="newPassword__form__submit__btn">
            Envoyer
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default ForgottenPassword;
