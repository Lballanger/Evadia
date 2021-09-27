/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import API from '../../api';
import cityStore from '../../store/city';

import './styles.scss';

const departements = [
  ...Array.from({ length: 98 }, (_, i) =>
    i + 1 > 9 ? (i + 1).toString() : `0${(i + 1).toString()}`
  ),
  '2A',
  '2B',
];
const schools = ['Maternelle', 'Elementaire', 'Primaire', 'Collège', 'Lycée'];

const Criteria = () => {
  const history = useHistory();
  const setCities = cityStore((state) => state.setCities);
  const [inputs, setInputs] = useState({
    populationmin: 0,
    populationmax: 500000,
    codedepartement: null,
  });

  const handleChange = (event) => {
    if (
      event.target.name === 'populationmax' &&
      +event.target.value <= +inputs.populationmin
    )
      return;
    if (
      event.target.name === 'populationmin' &&
      +event.target.value >= +inputs.populationmax
    )
      return;
    setInputs((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSumbit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await API.getCityWithCriteria(inputs);
      setCities(data);
      history.push('/results');
    } catch (error) {
      console.log('Error get by criteria: ', error.response.data);
      // Afficher une popup si il y a une erreur
    }
  };

  return (
    <section className="criteria__container">
      <h1>Rechercher des villes selon vos critères</h1>
      <form onSubmit={handleSumbit} className="criteria">
        <div className="criteria__inputs">
          <div className="criteria__inputs__toggle">
            <div className="criteria__inputs__toggle__1">
              <label className="switch">
                <input type="checkbox" />
                <div />
              </label>
              <span className="criteria__inputs__toggle__name">Critère 1</span>
            </div>
          </div>
        </div>
        <section className="range-slider">
          <span className="rangeValues">Choisir la population</span>
          <span>
            Minimum: {inputs.populationmin} - Maximum: {inputs.populationmax}
          </span>
          <input
            name="populationmin"
            value={inputs.populationmin}
            min="0"
            max="10000000"
            step="100"
            type="range"
            onChange={handleChange}
          />
          <input
            name="populationmax"
            value={inputs.populationmax}
            min="0"
            max="10000000"
            step="100"
            type="range"
            onChange={handleChange}
          />
        </section>
        <section className="departements">
          <select name="codedepartement" onChange={handleChange}>
            <option disabled>Choisir un code département</option>
            {departements.map((code) => (
              <option value={code} key={code}>
                {code}
              </option>
            ))}
          </select>
        </section>
        <section className="schools">
          <select name="type_ecole" onChange={handleChange}>
            <option disabled>Type d&apos;école</option>
            {schools.map((code) => (
              <option value={code} key={code}>
                {code}
              </option>
            ))}
          </select>
        </section>
        <button type="submit">Lancer la recherche</button>
      </form>
    </section>
    // <div className="criteria__container">
    //   <h1 className="criteria__h1">Ville selon vos critères</h1>
    //   <div className="criteria">
    //     {/* Inputs de type toggle */}
    //     <div className="criteria__inputs">
    //       <div className="criteria__inputs__toggle">
    //         <div className="criteria__inputs__toggle__1">
    //           <label className="switch">
    //             <input type="checkbox" />
    //             <div />
    //           </label>
    //           <span className="criteria__inputs__toggle__name">Critère 1</span>
    //         </div>

    //         <div className="criteria__inputs__toggle__1">
    //           <label className="switch">
    //             <input type="checkbox" />
    //             <div />
    //           </label>
    //           <span className="criteria__inputs__toggle__name">Critère 2</span>
    //         </div>

    //         <div className="criteria__inputs__toggle__1">
    //           <label className="switch">
    //             <input type="checkbox" />
    //             <div />
    //           </label>
    //           <span className="criteria__inputs__toggle__name">Critère 3</span>
    //         </div>
    //       </div>

    //       {/* Inputs de type slide */}

    //       <div className="criteria__slider">
    //         <div className="criteria__slider__1">
    //           <input type="range" id="critere" name="critere" min="0" max="11" />
    //           <label htmlFor="critere" className="criteria__slider__1__name">
    //             Critere 4
    //           </label>
    //         </div>

    //         <div className="criteria__slider__1">
    //           <input type="range" id="critere" name="critere" min="0" max="11" />
    //           <label htmlFor="critere" className="criteria__slider__1__name">
    //             Critere 5
    //           </label>
    //         </div>

    //         <div className="criteria__slider__1">
    //           <input type="range" id="critere" name="critere" min="0" max="11" />
    //           <label htmlFor="critere" className="criteria__slider__1__name">
    //             Critere 6
    //           </label>
    //         </div>
    //       </div>

    //       {/* Inputs de type Select */}

    //       <div className="criteria__inputs__select">
    //         <p className="criteria__inputs__select__name">Région</p>
    //         <select>
    //           <option value="auvergne">Auvergne-Rhône-Alpes</option>
    //           <option value="bourgogne">Bourgogne-Franche-Comté</option>
    //           <option value="bretagne">Alcoolique</option>
    //           <option value="centre_loire">Centre-Val de Loire</option>
    //           <option value="corse">Bombes et fromages</option>
    //           <option value="grand_est">Allemagne de France</option>
    //           <option value="nord">Hauts-de-France</option>
    //           <option value="paris">Ile-de-France</option>
    //           <option value="aquitaine">Nouvelle-Aquitaine</option>
    //           <option value="occitanie">Occitanie</option>
    //           <option value="loire">Pays de la Loire</option>
    //           <option value="paca">Provence-Alpes-Côte d’Azur</option>
    //         </select>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="criteria__submit">
    //     <div className="criteria__submit__display">
    //       <NavLink
    //         type="button"
    //         to="/results"
    //         className="criteria__submit__display__btn"
    //       >
    //         Va chercher !
    //       </NavLink>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Criteria;
