import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Accordion from './Accordion';
import './styles.scss';

const Account = () => (
  <>
    <Header />
    <div className="account__container">
      <div className="account__avatar__display">
        <img
          className="account__avatar__img"
          src="https://www.impressions-languedoc.eu/1967-large_default/dark-vador-casque.jpg"
          alt="dark vador"
        />
      </div>
      <div className="account__infos">
        <ul className="account__infos__ul">
          <li className="account__infos__li">Nom</li>
          <li className="account__infos__li">Prénom</li>
          <li className="account__infos__li">Email</li>
          <li className="account__infos__li">Ville</li>
        </ul>
        <button className="account__infos__edit" type="button">
          Modifier
        </button>
      </div>
    </div>

    <Accordion />
    <Accordion />

    <Footer />
  </>
);

export default Account;
