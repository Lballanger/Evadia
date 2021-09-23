/* eslint-disable react/no-unescaped-entities */
import React from 'react';
// import { NavLink } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';

import './styles.scss';

// eslint-disable-next-line react/prop-types
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
            <li className="details__card__main__li">
              {/* Code Postal : {city?.code_postal[0]} */}
            </li>
            <li className="details__card__main__li">Internet : Fibre</li>
            <li className="details__card__main__li">
              Population: pop personnes célibataires
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Footer />
  </>
);
export default Details;
