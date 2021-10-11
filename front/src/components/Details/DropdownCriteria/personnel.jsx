/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef } from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';
import useClickOutside from '../../../hooks/useClickOutside';

import './styles.scss';

const DropdownPersonnel = () => {
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
          Personnel de santé{' '}
          <IoChevronDownOutline
            className={` dropdown__button__arrow ${
              displayMenu ? 'dropdown__button__arrow__animation' : ''
            }`}
          />
        </div>
        {displayMenu ? (
          <ul className="details__dropdown__ul">
            <li className="details__dropdown__li">8 médecins généralistes</li>
            <li className="details__dropdown__li">5 sages-femmes</li>
            <li className="details__dropdown__li">4 pédiatres</li>
            <li className="details__dropdown__li">3 ophtalmologues</li>
            <li className="details__dropdown__li">2 dentistes</li>
            <li className="details__dropdown__li">1 dermatologue</li>
            <li className="details__dropdown__li">0 cardiologue</li>
            <li className="details__dropdown__li">0 pneumologue</li>
            <li className="details__dropdown__li">2 psychiatres</li>
          </ul>
        ) : null}
      </div>
    </>
  );
};

export default DropdownPersonnel;
