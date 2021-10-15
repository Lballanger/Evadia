import React, { useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import API from '../../../api';
import cityStore from '../../../store/city';
import './styles.scss';

const Accordion = ({ title, data, className = '' }) => {
  const [isOpened, setIsOpened] = useState(false);
  const removeFromFavorites = cityStore((state) => state.removeFromFavorites);

  const remove = async (communeId, isFavorite) => {
    const { data: response } = await API.cityToFavorites(communeId, isFavorite);
    removeFromFavorites({ code_insee: communeId });
    toast.success(response.message, { duration: 2000 });
  };

  return (
    <>
      <div className={`accordion ${className}`}>
        <div className="accordion__item">
          <button
            className="accordion__title"
            type="button"
            onClick={() => setIsOpened((state) => !state)}
            style={
              isOpened
                ? { borderRadius: '10px 10px 0 0' }
                : { borderRadius: '10px' }
            }
          >
            <div>
              {title} ({data.length})
            </div>
            <div>
              {isOpened ? (
                <IoChevronUp style={{ fontSize: '2rem' }} />
              ) : (
                <IoChevronDown style={{ fontSize: '2rem' }} />
              )}
            </div>
          </button>
          {isOpened
            ? data.map((city) => (
                <div className="accordion__content" key={city.id}>
                  <ul className="accordion__content__ul">
                    <li className="accordion__content__li">
                      <Link to={`/details/${city.commune_id}`}>
                        {city.details.city_name}
                      </Link>
                    </li>
                  </ul>
                  <button
                    className="accordion__content__btn"
                    type="button"
                    onClick={() => remove(city.commune_id, city.is_favorite)}
                  >
                    Retirer
                  </button>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

Accordion.propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      commune_id: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      is_favorite: PropTypes.bool.isRequired,
      details: PropTypes.shape({
        city_name: PropTypes.string.isRequired,
        population: PropTypes.number.isRequired,
        coordinates: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
          .isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default Accordion;
