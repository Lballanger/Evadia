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
import { ADD_TOAST, useToastContext } from '../../context/toastContext';

// eslint-disable-next-line react/prop-types
const Details = () => {
  const { codeInsee } = useParams();
  const history = useHistory();
  const { isMobile } = useWindowSize();
  const { toastDispatch } = useToastContext();
  const city = cityStore((state) => state.city);
  const setCity = cityStore((state) => state.setCity);
  const addToFavorites = cityStore((state) => state.addToFavorites);
  const removeFromFavorites = cityStore((state) => state.removeFromFavorites);
  const user = userStore((state) => state.user);
  const [dataForMap, setDataForMap] = useState([]);
  const [loading, setLoading] = useState(true);

  const showFavorite = () => {
    if (city.is_favorite) {
      return <IoStar className="favorite" color="#dcb525" size="1.5em" />;
    }
    return <IoStarOutline className="favorite" color="#dcb525" size="1.5em" />;
  };

  const toggleFavorite = async () => {
    if (user) {
      const { data } = await API.cityToFavorites(city.code_insee, true);
      if (data.status === 'added') {
        addToFavorites(city, true);
        toastDispatch({
          type: ADD_TOAST,
          payload: {
            type: 'success',
            content: `${city.city_name} a bien été ajouté à vos favoris`,
            duration: 10000,
          },
        });
      } else if (data.status === 'removed') {
        removeFromFavorites(city, true);
        toastDispatch({
          type: ADD_TOAST,
          payload: {
            type: 'success',
            // eslint-disable-next-line no-extra-boolean-cast
            content: `${city.city_name} a été retiré de vos favoris`,
            duration: 10000,
          },
        });
      }
    } else {
      toastDispatch({
        type: ADD_TOAST,
        payload: {
          type: 'info',
          content:
            'Vous devez être connecté pour pouvoir ajouter une ville en favoris',
          duration: 10000,
        },
      });
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
