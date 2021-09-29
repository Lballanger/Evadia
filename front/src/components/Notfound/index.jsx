import React from 'react';

import './styles.scss';
import gif from '../../assets/images/404.gif';

const Notfound = () => (
  <div className="notfound__container">
    <img className="notfound__img" src={gif} alt="404" />
    <p className="notfound__container__p">
      Il semblerait que J.S. ait donné un coup de nunchaku dans ta commune ! Il
      a tout cassé !
    </p>
  </div>
);

export default Notfound;
