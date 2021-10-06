/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import API from '../../api';
import cityStore from '../../store/city';
import departements from '../../assets/data/departements-region.json';
import regionsWithDepartements from '../../assets/data/regions_with_departements.json';

import './styles.scss';
import criteriaStore from '../../store/criteria';

const schools = ['Ecole', 'Collège', 'Lycée'];

const Criteria = () => {
  const history = useHistory();
  const setCities = cityStore((state) => state.setCities);
  const criterias = criteriaStore((state) => state.criterias);
  const setCriteria = criteriaStore((state) => state.setCriteria);
  const [inputs, setInputs] = useState(criterias);

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
    console.log(event.target.value);
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
        {/* <div className="criteria__inputs">
          <div className="criteria__inputs__toggle">
            <div className="criteria__inputs__toggle__1">
              <label className="switch">
                <input type="checkbox" />
                <div />
              </label>
              <span className="criteria__inputs__toggle__name">Critère 1</span>
            </div>
          </div>
        </div> */}
        <section className="range-slider">
          <label className="rangeValues">Choisir la population</label>
          <br />
          <br />
          <span className="range-slider__span">
            Minimum: {inputs.populationmin} - Maximum: {inputs.populationmax}
          </span>
          <input
            name="populationmin"
            defaultValue={criterias.populationmin}
            value={inputs.populationmin}
            min="0"
            max="300000"
            step="100"
            type="range"
            onChange={handleChange}
          />
          <input
            name="populationmax"
            defaultValue={criterias.populationmax}
            value={inputs.populationmax}
            min="0"
            max="300000"
            step="100"
            type="range"
            onChange={handleChange}
          />
        </section>
        <br />
        <section className="departements">
          <label htmlFor="code_departement">Choisir un département</label>
          <div className="select">
            <select
              id="code_departement"
              name="code_departement"
              onChange={handleChange}
              multiple
            >
              <option value={null}>Choisir un département</option>
              {departements.map((departement) => (
                <option
                  value={departement.num_dep}
                  key={departement.num_dep}
                  selected={criterias.code_departement.includes(
                    departement.num_dep
                  )}
                >
                  {departement.dep_name}
                </option>
              ))}
            </select>
            <span className="focus" />
          </div>
        </section>
        <br />
        <section className="regions">
          <label htmlFor="code_region">Choisir une région</label>
          <div className="select">
            <select
              id="code_region"
              name="code_region"
              onChange={handleChange}
              multiple
            >
              <option value={null}>Choisir une région</option>
              {regionsWithDepartements.map((region) => (
                <option
                  value={region.reg_code}
                  key={region.reg_code}
                  selected={criterias.code_region.includes(region.reg_code)}
                >
                  {region.reg_name}
                </option>
              ))}
            </select>
            <span className="focus" />
          </div>
        </section>
        <br />
        <section className="schools">
          <label htmlFor="type_ecole">Choisir le type d&apos;école</label>
          <div className="select">
            <select
              id="type_select"
              name="type_ecole"
              onChange={handleChange}
              multiple
            >
              <option value={null}>Type d&apos;école</option>
              {schools.map((schoolType) => (
                <option
                  value={schoolType}
                  key={schoolType}
                  selected={criterias.type_ecole.includes(schoolType)}
                >
                  {schoolType}
                </option>
              ))}
            </select>
          </div>
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
