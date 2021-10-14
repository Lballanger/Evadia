import React from 'react';

import './styles.scss';
// import island from '../../assets/images/island.png';
import NF from '../../assets/images/NF.gif';

const Notfound = () => (
  <div className="notfound__container">
    <img className="notfound__img" src={NF} alt="404" />
    <div className="font-link" />
  </div>
);

export default Notfound;
