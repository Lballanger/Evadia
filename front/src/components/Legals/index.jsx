import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

import './styles.scss';

const Legals = () => (
  <div className="legals">
    <Header />
    <p>https://fr.orson.io/1371/generateur-mentions-legales</p>
    <p>
      Il nous faut la liste complète des API afin de pouvoir générer les
      mentions légales
    </p>
    <Footer />
  </div>
);

export default Legals;
