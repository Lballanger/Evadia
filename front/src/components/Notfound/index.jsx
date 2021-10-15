import React from 'react';
import { NavLink } from 'react-router-dom';

import './styles.scss';
// import island from '../../assets/images/island.png';
import NF from '../../assets/images/NF.gif';

const Notfound = () => (
  <div className="notfound__container">
    <img className="notfound__img" src={NF} alt="404" />
    <div className="font-link" />
    <NavLink type="button" to="/">
      <button type="submit" className="notFound__form-group-button">
        Retour à la page d&apos;accueil
      </button>
    </NavLink>
  </div>
);

export default Notfound;
