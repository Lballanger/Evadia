import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IoChevronForward, IoStar, IoStarOutline } from 'react-icons/io5';
import userStore from '../../../store/user';
import paris from '../../../assets/images/paris.jpg';

const Item = ({ city }) => {
  const user = userStore((state) => state.user);

  const showFavorite = () => {
    if (user) {
      const cityIsFavorite = user.favorites.find(
        (favorite) => favorite.commune_id === city.code_insee
      );
      if (cityIsFavorite) {
        return <IoStar className="favorite" color="#dcb525" size="1.5em" />;
      }
      return (
        <IoStarOutline className="favorite" color="#dcb525" size="1.5em" />
      );
    }
    return null;
  };

  return (
    <Link to={`/details/${city.code_insee}`}>
      <div className="result">
        {showFavorite()}
        <img
          className="picture"
          src=/* {`../../assets/images/${city.city_name}.jpg`} */ {paris}
          alt="city"
        />
        <div className="result__info">
          <p>{city.city_name}</p>
          <div className="infos">
            <p>Population: {city.population}</p>
            <p>info</p>
          </div>
        </div>
        <IoChevronForward />
      </div>
    </Link>
  );
};

Item.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  city: PropTypes.object.isRequired,
};

export default Item;
