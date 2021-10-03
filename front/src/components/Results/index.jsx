import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import useWindowSize from '../../hooks/useWindowSize';
import cityStore from '../../store/city';
import Map from '../Map';
import paris from '../../assets/images/paris.jpg';

import './styles.scss';
import Item from './Item';

const Results = () => {
  const { isMobile } = useWindowSize();
  const cities = cityStore(state => state.cities);

  const transformCoords = data =>
    data.map(city => ({
      city_name: city.city_name,
      population: city.population,
      coords: [city.coordinates.x, city.coordinates.y],
    }));

  return (
    <>
      {!isMobile && (
        <Map
          cities={transformCoords(cities)}
          center={[cities[0].coordinates.x, cities[0].coordinates.y]}
          className="fixed-map"
        />
      )}
      <div className={`list__results${isMobile ? '' : ' with-map'}`}>
        <div className="results">
          <div className="results__criteria">
            <div className="criteria__return">
              <NavLink
                type="button"
                to="/criteria"
                className="criteria__return__btn"
              >
                Modifiez vos critères
              </NavLink>
            </div>
            <div className="resultsNbr">
              {cities.length} ville{cities.length > 1 ? 's' : ''} dans votre
              recherche.
            </div>
          </div>
        </div>

        {cities.map(city => (
          <Item key={city.code_insee} city={city} />
        ))}
      </div>
    </>
  );
};

export default Results;
