/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Footer from '../Footer';
import Header from '../Header';

import './styles.scss';

const Criteria = () => (
  <>
    <div className="criteria">
      <Header />
      <h1 className="criteria__h1">Ville selon vos critères</h1>

      {/* Inputs de type toggle */}
      <div className="criteria__inputs">
        <div className="criteria__inputs__toggle">
          <label className="switch">
            <input type="checkbox" />
            <div />
          </label>
        </div>
        <span>Critère 1</span>
      </div>

      <div className="criteria__inputs" />
      <div className="criteria__inputs__toggle">
        <label className="switch">
          <input type="checkbox" />
          <div />
        </label>
      </div>
      <span>Critère 2</span>
    </div>

    <div className="criteria__inputs">
      <div className="criteria__inputs__toggle">
        <label className="switch">
          <input type="checkbox" />
          <div />
        </label>
      </div>
      <span>Critère 3</span>
    </div>

    {/* Inputs de type slide */}

    <div className="criteria__inputs__slider">
      <input type="range" id="critere" name="critere" min="0" max="11" />
      <label htmlFor="critere">Critere 4</label>
    </div>

    <div className="criteria__inputs__slider">
      <input type="range" id="critere" name="critere" min="0" max="11" />
      <label htmlFor="critere">Critere 5</label>
    </div>

    <div className="criteria__inputs__slider">
      <input type="range" id="critere" name="critere" min="0" max="11" />
      <label htmlFor="critere">Critere 6</label>
    </div>

    {/* Inputs de type Select */}

    <div className="criteria__inputs__select">
      <select>
        <option value="auvergne">Auvergne-Rhône-Alpes</option>
        <option value="bourgogne">Bourgogne-Franche-Comté</option>
        <option value="bretagne">Alcoolique</option>
        <option value="centre_loire">Centre-Val de Loire</option>
        <option value="corse">Bombes et fromages</option>
        <option value="grand_est">Allemagne de France</option>
        <option value="nord">Hauts-de-France</option>
        <option value="paris">Ile-de-France</option>
        <option value="aquitaine">Nouvelle-Aquitaine</option>
        <option value="occitanie">Occitanie</option>
        <option value="loire">Pays de la Loire</option>
        <option value="paca">Provence-Alpes-Côte d’Azur</option>
      </select>
    </div>

    <Footer />
  </>
);

export default Criteria;
