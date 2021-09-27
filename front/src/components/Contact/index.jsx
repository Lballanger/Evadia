import React from 'react';

import './styles.scss';

const Contact = () => (
  <div className="contact">
    <form action="" methode="get" className="contact__form">
      <div className="contact__form">
        <input type="email" name="email" id="email" placeholder="Votre Email" />
        <textarea
          type="text-area"
          placeholder="Votre Message"
          rows="10"
          cols="28"
        />
      </div>
    </form>
  </div>
);

export default Contact;
