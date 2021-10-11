/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef } from 'react';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import useClickOutside from '../../../hooks/useClickOutside';

import './styles.scss';

const DropdownSchool = () => {
  // Méthode pour le petit menu déroulant.
  const [displayMenu, setDisplayMenu] = useState(false);
  const dropdownRef = useRef();

  useClickOutside(dropdownRef, () => setDisplayMenu(false));

  const showDropdownMenu = (event) => {
    event.preventDefault();
    setDisplayMenu((state) => !state);
  };

  return (
    <>
      <div className="details__dropdown" ref={dropdownRef}>
        <div className="details__dropdown__button" onClick={showDropdownMenu}>
          {' '}
          Ecoles{' '}
          <IoChevronDownOutline
            className={` dropdown__button__arrow ${
              displayMenu ? 'dropdown__button__arrow__animation' : ''
            }`}
          />
        </div>
        {displayMenu ? (
          <ul className="details__dropdown__ul">
            <li className="details__dropdown__li">42 écoles trouvées</li>
          </ul>
        ) : null}
      </div>
    </>
  );
};

export default DropdownSchool;
