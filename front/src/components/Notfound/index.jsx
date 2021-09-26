import React from 'react';

import './styles.scss';
import gif from '../../assets/images/404.gif';

const Notfound = () => (
  <div className="notfound__container">
    <img src={gif} alt="404" />
    <p className="notfound__container__p">
      Choisi une commune présente dans notre BDD wsh !
    </p>
  </div>
);

export default Notfound;
