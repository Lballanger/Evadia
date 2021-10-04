/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef } from 'react';
import {
  IoRefreshCircleOutline,
  IoReturnDownBackOutline,
  IoSwapHorizontalOutline,
  IoLocateOutline,
} from 'react-icons/io5';
import { useHistory } from 'react-router';
import cityStore from '../../../store/city';
import API from '../../../api';
import AutoSuggest from '../../AutoSuggest';

import './styles.scss';

const BtnDesktop = () => {
  // Methode pour la navigation du petit menu.
  const history = useHistory();
  const setCity = cityStore((state) => state.setCity);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Méthode pour le bouton Aléatoire du petit menu.
  const toRandom = async () => {
    const data = await API.getRandomCity();
    setCity(data[0]);
    history.push(`/details/${data[0].code_insee}`);
  };

  // Méthode pour le bouton Recherche Ville du petit menu.
  const goToDetails = (commune) => {
    history.push(`/details/${commune.code_insee}`);
  };

  const handleCloseModal = (event) => {
    event.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="btn__desktop">
        <div className="btn__desktop__details">
          <button
            className="btn__desktop__details__btn"
            type="button"
            onClick={toRandom}
          >
            <IoRefreshCircleOutline />
          </button>
        </div>

        <div className="btn__desktop__details">
          <button className="btn__desktop__details__btn" type="button">
            <a className="btn__desktop__details__active" href="/criteria">
              <IoSwapHorizontalOutline />
            </a>
          </button>
        </div>

        <div className="btn__desktop__details">
          <button
            className="btn__desktop__details__btn"
            type="button"
            onClick={history.goBack}
          >
            <IoReturnDownBackOutline />
          </button>
        </div>

        <div className="btn__desktop__details">
          <button
            className="btn__desktop__details__btn"
            type="button"
            onClick={() => setIsModalOpen(true)}
          >
            <IoLocateOutline />
          </button>
        </div>
        {isModalOpen && (
          <>
            <div className="overlay" onClick={handleCloseModal} />
            <div className="modal">
              <AutoSuggest onSelected={goToDetails} limit={5} />
              <button
                type="button"
                onClick={handleCloseModal}
                className="modal__close"
              >
                X
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BtnDesktop;
