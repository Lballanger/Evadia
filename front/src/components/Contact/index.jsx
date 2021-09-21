import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

import './styles.scss';

const Contact = () => (
  <div className="Contact">
    <Header />
    <form action="" methode="get" className="contact__form">
      <div className="contact__form">
        <input type="email" name="email" id="email" placeholder="Votre Email" />
        <input type="text-area" />
      </div>
    </form>
    <Footer />
  </div>
);

export default Contact;
