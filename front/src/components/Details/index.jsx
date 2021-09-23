/* eslint-disable react/no-unescaped-entities */
import React from 'react';
// import { NavLink } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';

import './styles.scss';

const Details = () => (
  <>
    <Header />
    <div className="details__container">
      <div className="details__new__search">
        <button className="details__new__search__button" type="button">
          Nouvelle recherche (menu burger on mobile)
        </button>
      </div>

      <div className="details__card">
        <div className="details__card__titre">
          <p className="details__card__titre__p">Nom de la ville</p>
          <button className="details__card__button" type="button">
            Favoris
          </button>
        </div>

        <div className="details__card__main">
          <ul className="details__card__main__ul">
            <li className="details__card__main__li">Département : 51</li>
            <li className="details__card__main__li">Code Postal : 51510</li>
            <li className="details__card__main__li">Internet : Fibre</li>
            <li className="details__card__main__li">Population: 17.500</li>
          </ul>
        </div>
      </div>
    </div>
    <Footer />
  </>
);

export default Details;
