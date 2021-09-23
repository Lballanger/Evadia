/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { NavLink } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import backgroundVideo from '../../../public/drone_view.mp4';

import './styles.scss';

const Homepage = () => (
  <>
    <div className="background_video">
      <video autoPlay loop muted id="video">
        <source ssrc={backgroundVideo} type="video/mp4" />
      </video>
    </div>
    <Header />
    <div className="homepage__container">
      <h1 className="homepage__container__h1">Evadez-vous avec Evadia</h1>
      <h2 className="homepage__container__h2">
        Trouvez la ville de vos rêves pour un déménagement, un week-end, et bien
        plus encore !
      </h2>
      <div className="homepage__container__search">
        <NavLink
          className="homepage__container__search__link__button"
          type="button"
          to="/random"
        >
          <div className="homepage__container__search__link">
            Recherche aléatoire
          </div>
        </NavLink>

        <NavLink
          className="homepage__container__search__link__button"
          type="button"
          to="/details"
        >
          <div className="homepage__container__search__link">
            Recherche par nom de ville
          </div>
        </NavLink>

        <NavLink
          className="homepage__container__search__link__button"
          type="button"
          to="/criteria"
        >
          <div className="homepage__container__search__link">
            Recherche par critères
          </div>
        </NavLink>
      </div>
    </div>
    <Footer />
  </>
);

export default Homepage;
