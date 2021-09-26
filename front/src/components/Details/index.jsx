/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
import Map from '../Map';
import cityHooks from '../../hooks/useCity';

import './styles.scss';
import cityStore from '../../store/city';

const { useRandomCity } = cityHooks;

// eslint-disable-next-line react/prop-types
const Details = () => {
  const city = cityStore(state => state.city);

  return (
    <div className="details__container">
      <div className="details__new__search">
        <button className="details__new__search__button" type="button">
          Nouvelle recherche (menu burger on mobile)
        </button>
      </div>

      <div className="details__card">
        <div className="details__card__titre">
          <p className="details__card__titre__p">{city.city_name}</p>
          <button className="details__card__button" type="button">
            Favoris
          </button>
        </div>
        <div className="details__card__main">
          <ul className="details__card__main__ul">
            <li className="details__card__main__li">
              Code Postal : {city.code_postal[0]}
            </li>
            <li className="details__card__main__li">Internet : Fibre</li>
            <li className="details__card__main__li">
              Population: {city.population}
            </li>
          </ul>
        </div>
      </div>

      <div className="details__map">
        <Map />
      </div>
    </div>
  );
};
export default Details;
