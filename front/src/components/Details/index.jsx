import React from 'react';
// import { NavLink } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';

import './styles.scss';

const Details = () => (
  <>
    <Header />
    <div className="container">
      <button className="details__new__search__button" type="button">
        Nouvelle recherche (ça doit être un menu burger ici)
      </button>

      <div className="details__card">
        <div className="details__card__titre">
          <p className="details__card__titre__p">Nom de la ville</p>
          <button className="details__card__button" type="button">
            Favoris
          </button>
        </div>

        <div className="details__card__main">
          <p className="details__card__main__p">
            Résultat de la recherche mais j'ai aucune idée de comment on va
            faire.
          </p>
          <p className="details__card__main__p">Germain oscour !</p>
        </div>
      </div>
    </div>
    <Footer />
  </>
);

export default Details;
