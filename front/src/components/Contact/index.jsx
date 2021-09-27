import React from 'react';

import './styles.scss';

const Contact = () => (
  <div className="contact">
    <form action="" methode="get" className="contact__form">
      <div className="contact__form__div">
        <input
          className="email"
          type="email"
          name="email"
          id="email"
          placeholder="Votre Email"
        />
        <textarea
          className="textarea"
          type="text-area"
          placeholder="Votre Message"
          rows="20"
          cols="28"
        />
        <input className="submit" type="submit" value="Envoyer" />
      </div>
    </form>
  </div>
);

export default Contact;
