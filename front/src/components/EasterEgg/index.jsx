import React from 'react';

import './styles.scss';
import gif from '../../assets/images/404.gif';

const EasterEgg = () => (
  <div className="js__container">
    <img className="js__img" src={gif} alt="404" />
    <p className="js__container__p">
      Il semblerait que J.S. ait donné un coup de nunchaku dans ta commune ! Il
      a tout cassé !
    </p>
  </div>
);

export default EasterEgg;
