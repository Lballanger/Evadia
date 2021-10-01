/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import './styles.scss';

const Dropdown = () => {
  const [displayMenu, setDisplayMenu] = useState(false);

  const showDropdownMenu = (event) => {
    event.preventDefault();
    setDisplayMenu(true);
  };

  const hideDropdownMenu = () => {
    setDisplayMenu(false);
  };

  return (
    <div className="dropdown" style={{ background: 'red', width: '200px' }}>
      <div className="dropdown__button" onClick={showDropdownMenu}>
        {' '}
        Navigation{' '}
      </div>

      {displayMenu ? (
        <ul className="dropdonw__ul">
          <li className="dropdown__list">
            <a className="active" href="#Create Page">
              Create Page
            </a>
          </li>
          <li className="dropdown__list">
            <a href="#Manage Pages">Manage Pages</a>
          </li>
          <li className="dropdown__list">
            <a href="#Create Ads">Create Ads</a>
          </li>
          <li className="dropdown__list">
            <a href="#Manage Ads">Manage Ads</a>
          </li>
          <li className="dropdown__list">
            <a href="#Activity Logs">Activity Logs</a>
          </li>
          <li className="dropdown__list">
            <a href="#Setting">Setting</a>
          </li>
          <li className="dropdown__list">
            <a href="#Log Out">Log Out</a>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default Dropdown;
