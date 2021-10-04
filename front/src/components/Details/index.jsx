/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { IoStar, IoStarOutline } from 'react-icons/io5';
import Map from '../Map';
import cityStore from '../../store/city';
import userStore from '../../store/user';
import useWindowSize from '../../hooks/useWindowSize';
import API from '../../api';
import Dropdown from './MenuMobile/Dropdown';

import './styles.scss';
import BtnDesktop from './BtnDesktop/BtnDesktop';

// eslint-disable-next-line react/prop-types
const Details = () => {
  const { codeInsee } = useParams();
  const history = useHistory();
  const { isMobile } = useWindowSize();
  const city = cityStore((state) => state.city);
  const setCity = cityStore((state) => state.setCity);
  const user = userStore((state) => state.user);
  const [dataForMap, setDataForMap] = useState([]);
  const [loading, setLoading] = useState(true);

  const showFavorite = () => {
    console.log(user);
    if (user) {
      const cityIsFavorite = user.favorites.find(
        (favorite) => favorite.commune_id === city.code_insee
      );
      if (cityIsFavorite) {
        return <IoStar className="favorite" color="#dcb525" size="1.5em" />;
      }
    }
    return <IoStarOutline className="favorite" color="#dcb525" size="1.5em" />;
  };

  const toggleFavorite = async () => {
    if (user) {
      await API.cityToFavorites(city.code_insee, true);
      await API.getUser();
    } else {
      alert(
        'Vous devez être connecté pour pouvoir ajouter une ville en favoris'
      );
    }
  };

  useEffect(() => {
    // eslint-disable-next-line consistent-return
    const getCity = async () => {
      try {
        const data = await API.getCityByInsee(codeInsee);
        if (!data.city_name) throw new Error('City not found');
        setCity(data);
        setDataForMap((state) => [
          ...state,
          {
            city_name: data.city_name,
            population: data.population,
            coords: [data.coordinates.x, data.coordinates.y],
          },
        ]);
      } catch (error) {
        return history.push('/404');
      } finally {
        setLoading(false);
      }
    };
    getCity();
  }, [codeInsee]);

  if (loading) return 'Loading...'; // TODO: Implementer un loader

  return (
    <div className="details__container">
      <div className="details__new__search" style={{ display: 'flex' }}>
        <Dropdown />
      </div>

      <div className="details__card">
        <div className="details__card__main">
          <BtnDesktop />
          <div className="details__card__titre">
            <p className="details__card__titre__p">{city.city_name}</p>
            <button
              className="details__card__button"
              type="button"
              onClick={toggleFavorite}
            >
              {showFavorite()}
            </button>
          </div>
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

      {!isMobile && (
        <div className="details__map">
          <Map cities={dataForMap} center={dataForMap[0].coords} zoom={11} />
        </div>
      )}
    </div>
  );
};
export default Details;
