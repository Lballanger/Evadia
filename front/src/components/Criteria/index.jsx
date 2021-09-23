/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { NavLink } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';

import './styles.scss';

const Criteria = () => (
  <>
    <Header />
    <div className="criteria__container">
      <h1 className="criteria__h1">Ville selon vos critères</h1>
      <div className="criteria">
        {/* Inputs de type toggle */}
        <div className="criteria__inputs">
          <div className="criteria__inputs__toggle">
            <div className="criteria__inputs__toggle__1">
              <label className="switch">
                <input type="checkbox" />
                <div />
              </label>
              <span className="criteria__inputs__toggle__name">Critère 1</span>
            </div>

            <div className="criteria__inputs__toggle__1">
              <label className="switch">
                <input type="checkbox" />
                <div />
              </label>
              <span className="criteria__inputs__toggle__name">Critère 2</span>
            </div>

            <div className="criteria__inputs__toggle__1">
              <label className="switch">
                <input type="checkbox" />
                <div />
              </label>
              <span className="criteria__inputs__toggle__name">Critère 3</span>
            </div>
          </div>

          {/* Inputs de type slide */}

          <div className="criteria__slider">
            <div className="criteria__slider__1">
              <input
                type="range"
                id="critere"
                name="critere"
                min="0"
                max="11"
              />
              <label htmlFor="critere" className="criteria__slider__1__name">
                Critere 4
              </label>
            </div>

            <div className="criteria__slider__1">
              <input
                type="range"
                id="critere"
                name="critere"
                min="0"
                max="11"
              />
              <label htmlFor="critere" className="criteria__slider__1__name">
                Critere 5
              </label>
            </div>

            <div className="criteria__slider__1">
              <input
                type="range"
                id="critere"
                name="critere"
                min="0"
                max="11"
              />
              <label htmlFor="critere" className="criteria__slider__1__name">
                Critere 6
              </label>
            </div>
          </div>

          {/* Inputs de type Select */}

          <div className="criteria__inputs__select">
            <p className="criteria__inputs__select__name">Région</p>
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
        </div>
      </div>

      <div className="criteria__submit">
        <div className="criteria__submit__display">
          <NavLink
            type="button"
            to="/results"
            className="criteria__submit__display__btn"
          >
            Va chercher !
          </NavLink>
        </div>
      </div>
    </div>
    <Footer />
  </>
);

export default Criteria;
