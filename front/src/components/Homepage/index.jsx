/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import backgroundVideo from '../../assets/video/timelapse_light_grid_4.webm';
import API from '../../api';

import './styles.scss';
import cityStore from '../../store/city';
import AutoSuggest from '../AutoSuggest';

const Homepage = () => {
  const history = useHistory();
  const setCity = cityStore((state) => state.setCity);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toRandom = async () => {
    const data = await API.getRandomCity();
    setCity(data[0]);
    history.push(`/details/${data[0].code_insee}`);
  };

  const goToDetails = (commune) => {
    history.push(`/details/${commune.code_insee}`);
  };

  const handleCloseModal = (event) => {
    event.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="background_video">
        <video autoPlay loop muted id="video">
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      </div>
      <div className="homepage__container">
        <h1 className="homepage__container__h1">Evadez-vous avec </h1>
        <span className="homepage__container__evadia">Evadia</span>
        <h2 className="homepage__container__h2">
          Trouvez la ville de vos rêves pour un week-end, un déménagement et
          bien plus encore !
        </h2>
        <div className="homepage__container__search">
          <a
            href="#"
            className="homepage__container__search__link__button"
            onClick={toRandom}
          >
            <div className="homepage__container__search__link">Aléatoire</div>
          </a>

          {/* <NavLink className="homepage__container__search__link__button" type="button" to="/details">
            <div className="homepage__container__search__link">Par ville</div>
          </NavLink> */}
          <div
            className="homepage__container__search__link__button"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="homepage__container__search__link">Par ville</div>
          </div>

          <NavLink
            className="homepage__container__search__link__button"
            type="button"
            to="/criteria"
          >
            <div className="homepage__container__search__link">Critères</div>
          </NavLink>
        </div>
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
    </>
  );
};

export default Homepage;
