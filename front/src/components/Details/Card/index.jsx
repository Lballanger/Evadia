/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ isDisabled, isActive, handleCards, cardName, children }) => (
  <div
    className={`details__card__main__display__parent ${
      isDisabled ? 'disabled' : ''
    } ${isActive ? 'active' : ''}`}
    onClick={handleCards}
  >
    <div className="details__card__main__display__cadres">
      {children}
      <span className="details__card__main__display__cadres__text">
        {cardName}
      </span>
    </div>
  </div>
);

Card.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  handleCards: PropTypes.func.isRequired,
  cardName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Card;
