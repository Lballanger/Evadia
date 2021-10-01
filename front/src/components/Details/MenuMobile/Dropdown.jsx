/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import useClickOutside from '../../../hooks/useClickOutside';
import cityStore from '../../../store/city';
import API from '../../../api';
import AutoSuggest from '../../AutoSuggest';

import './styles.scss';

const Dropdown = () => {
  // Méthode pour le petit menu déroulant.
  const [displayMenu, setDisplayMenu] = useState(false);
  const dropdownRef = useRef();

  useClickOutside(dropdownRef, () => setDisplayMenu(false));

  const showDropdownMenu = (event) => {
    event.preventDefault();
    setDisplayMenu((state) => !state);
  };

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
      <div className="dropdown" ref={dropdownRef}>
        <div className="dropdown__button" onClick={showDropdownMenu}>
          {' '}
          Navigation{' '}
          <IoChevronDownOutline
            className={` dropdown__button__arrow ${
              displayMenu ? 'dropdown__button__arrow__animation' : ''
            }`}
          />
        </div>

        {displayMenu ? (
          <ul className="dropdown__ul">
            <li className="dropdown__list">
              <a className="active" href="/criteria">
                Par critères
              </a>
            </li>
            <li className="dropdown__list">
              <a onClick={toRandom}>Aléatoire</a>
            </li>
            <li className="dropdown__list">
              <a onClick={() => setIsModalOpen(true)}>Par ville</a>
            </li>
          </ul>
        ) : null}
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

export default Dropdown;
