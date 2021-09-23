/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { randomCity, getRandomCity } from '../../features/city/citySlice';
// import { NavLink } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';

import './styles.scss';

// eslint-disable-next-line react/prop-types
const Details = () => {
  const dispatch = useDispatch();
  const { city, loading } = useSelector(randomCity);

  useEffect(() => {
    dispatch(getRandomCity());
  }, [dispatch]);
  if (loading) return 'Loading';
  return (
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
            <p className="details__card__titre__p">{city?.city_name}</p>
            <button className="details__card__button" type="button">
              Favoris
            </button>
          </div>
          {JSON.stringify(city)}
          <div className="details__card__main">
            <ul className="details__card__main__ul">
              <li className="details__card__main__li">
                {/* Code Postal : {city?.code_postal[0]} */}
              </li>
              <li className="details__card__main__li">Internet : Fibre</li>
              <li className="details__card__main__li">
                Population: {city?.population} personnes célibataires
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Details;
