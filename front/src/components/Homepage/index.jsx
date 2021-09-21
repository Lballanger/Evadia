import React from 'react';
import { NavLink } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';

import './styles.scss';

const Homepage = () => (
  <>
    <Header />
    <div className="homepage__container">
      <h2 className="homepage__container__h2">Evadez-vous</h2>
      <p className="homepage__container__p">
        Le Lorem Ipsum est simplement du faux texte employé dans la composition
        et la mise en page avant impression. Le Lorem Ipsum est le faux texte
        standard de l'imprimerie depuis les années 1500, quand un imprimeur
        anonyme assembla ensemble des morceaux de texte pour réaliser un livre
        spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles,
        mais s'est aussi adapté à la bureautique informatique, sans que son
        contenu n'en soit modifié. Il a été popularisé dans les années 1960
        grâce à la vente de feuilles Letraset contenant des passages du Lorem
        Ipsum, et, plus récemment, par son inclusion dans des applications de
        mise en page de texte, comme Aldus PageMaker.
      </p>
      <div className="homepage__container__search">
        <div className="homepage__container__search__random">
          <NavLink
            className="homepage__container__search__random__button"
            type="button"
            to="/random"
          >
            Recherche aléatoire
          </NavLink>
        </div>

        <div className="homepage__container__search__city">
          <NavLink
            className="homepage__container__search__city__button"
            type="button"
            to="/details"
          >
            Recherche par nom de ville
          </NavLink>
        </div>

        <div className="homepage__container__search__criteria">
          <NavLink
            className="homepage__container__search__criteria__button"
            type="button"
            to="/criteria"
          >
            Recherche par critères
          </NavLink>
        </div>
      </div>
    </div>
    <Footer />
  </>
);

export default Homepage;
