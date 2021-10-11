import React from 'react';

import './styles.scss';
import island from '../../assets/images/island.png';

const Notfound = () => (
  <div className="notfound__container">
    <img className="notfound__img" src={island} alt="404" />
    <p className="notfound__container__p">404 city not found.</p>
    <p className="notfound__container__p">
      Notre API ne fait pas les îles désertes, désolé !
    </p>
  </div>
);

export default Notfound;
