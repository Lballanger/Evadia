import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { IoMapOutline } from 'react-icons/io5';
import useWindowSize from '../../hooks/useWindowSize';
import cityStore from '../../store/city';
import mapStore from '../../store/map';
import Map from '../Map';
import paris from '../../assets/images/paris.jpg';
import backgroundResults from '../../assets/images/backgroundResults.jpg';

import './styles.scss';

const Results = () => {
  const { isMobile } = useWindowSize();
  const cities = cityStore((state) => state.cities);
  const setShowMap = mapStore((state) => state.setShowMap);

  const transformCoords = (data) =>
    data.map((city) => ({
      city_name: city.city_name,
      population: city.population,
      coords: [city.coordinates.x, city.coordinates.y],
    }));

  return (
    <>
      {/* {!isMobile && (
        <Map
          cities={transformCoords(cities)}
          center={[cities[0].coordinates.x, cities[0].coordinates.y]}
          className="fixed-map"
        />
      )} */}
      <div className={`list__results${isMobile ? '' : ' with-map'}`}>
        <div className="results">
          <div className="results__criteria">
            <div
              className="criteria__return"
              style={{
                display: 'flex',
                alignContent: 'center',
                gap: '1rem',
                flexDirection: 'row',
              }}
            >
              <NavLink
                type="button"
                to="/criteria"
                className="criteria__return__btn"
              >
                Modifiez vos critères
              </NavLink>
              {isMobile ? (
                <button
                  type="button"
                  onClick={() => setShowMap(true)}
                  style={{
                    backgroundColor: '#38bd98',
                    textAlign: 'center',
                    borderRadius: '0.5rem',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    cursor: 'pointer',
                    alignSelf: 'center',
                  }}
                >
                  <IoMapOutline color="#fff" size="20px" />
                </button>
              ) : null}
            </div>

            <div className="resultsNbr">
              {cities.length} ville{cities.length > 1 ? 's' : ''} dans votre
              recherche.
            </div>
          </div>
        </div>

        {cities.map((city) => (
          <Link key={city.code_insee} to={`/details/${city.code_insee}`}>
            <div className="result">
              <img
                className="picture"
                src=/* {`../../assets/images/${city.city_name}.jpg`} */ {
                  backgroundResults
                }
                alt="city"
              />
              <div className="result__info">
                <p>
                  {city.city_name} - {city.code_postal[0]}
                </p>
                <div className="infos">
                  <p>Nombre d&apos;habitants : {city.population}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Results;
