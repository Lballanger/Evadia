/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef } from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';
import useClickOutside from '../../../hooks/useClickOutside';

import './styles.scss';

// eslint-disable-next-line react/prop-types
const DropdownShop = ({ data = [] }) => {
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
          Commerces{' '}
          <IoChevronDownOutline
            className={` dropdown__button__arrow ${
              displayMenu ? 'dropdown__button__arrow__animation' : ''
            }`}
          />
        </div>
        {displayMenu ? (
          <ul className="details__dropdown__ul">
            <li className="details__dropdown__li">
              {data ? `${data.length} commerces trouvés` : 'Aucun commerce'}
            </li>
          </ul>
        ) : null}
      </div>
    </>
  );
};

export default DropdownShop;
