import React from 'react';
import { NavLink } from 'react-router-dom';
import useWindowSize from '../../hooks/useWindowSize';
import cityStore from '../../store/city';
import Map from '../Map';

import './styles.scss';

const Results = () => {
  const { isMobile } = useWindowSize();
  const cities = cityStore((state) => state.cities);

  const transformCoords = (data) =>
    data.map((city) => ({
      city_name: city.city_name,
      population: city.population,
      coords: [city.coordinates.x, city.coordinates.y],
    }));

  return (
    <>
      {!isMobile && <Map cities={transformCoords(cities)} />}
      <div className={`list__results${isMobile ? '' : ' with-map'}`}>
        <div className="results">
          <div className="results__criteria">
            <div className="criteria__return">
              <NavLink
                type="button"
                to="/criteria"
                className="criteria__return__btn"
              >
                Modifier critères
              </NavLink>
            </div>
            <div className="resultsNbr">
              {cities.length}
              ville{cities.length > 1 ? 's' : ''} dans votre recherche(s).
            </div>
          </div>
        </div>

        {cities.map((city) => (
          <div className="result">
            <button type="button" className="result__button">
              <img
                className="picture"
                src={`../../assets/images/${city.city_name}.jpg`}
                alt="city"
              />
              <div className="result__info">
                <p>{city.city_name}</p>
                <div className="infos">
                  <p>{city.population}</p>
                  <p>info</p>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Results;
