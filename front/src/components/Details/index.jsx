/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Map from '../Map';
import cityStore from '../../store/city';
import useWindowSize from '../../hooks/useWindowSize';
import API from '../../api';

import './styles.scss';

// eslint-disable-next-line react/prop-types
const Details = () => {
  const { codeInsee } = useParams();
  const history = useHistory();
  const { isMobile } = useWindowSize();
  const city = cityStore((state) => state.city);
  const setCity = cityStore((state) => state.setCity);
  const [dataForMap, setDataForMap] = useState([]);
  const [loading, setLoading] = useState(true);

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

      {!isMobile && (
        <div className="details__map">
          <Map cities={dataForMap} center={dataForMap[0].coords} zoom={11} />
        </div>
      )}
    </div>
  );
};
export default Details;
