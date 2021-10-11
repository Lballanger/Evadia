/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MultiSelect } from 'react-multi-select-component';
import API from '../../api';
import cityStore from '../../store/city';
import mapStore from '../../store/map';
import departements from '../../assets/data/departements-region.json';
import regionsWithDepartements from '../../assets/data/regions_with_departements.json';

import './styles.scss';
import criteriaStore from '../../store/criteria';

const schoolsSelect = [
  {
    label: 'Ecole',
    value: 'Ecole',
  },
  {
    label: 'Collège',
    value: 'Collège',
  },
  {
    label: 'Lycée',
    value: 'Lycée',
  },
];

const departementsSelect = departements.map((departement) => ({
  label: departement.dep_name,
  value: departement.num_dep.toString(),
}));
const regionsSelect = regionsWithDepartements.map((region) => ({
  label: region.reg_name,
  value: region.reg_code.toString(),
}));

const Criteria = () => {
  const history = useHistory();
  const setCities = cityStore((state) => state.setCities);
  const criterias = criteriaStore((state) => state.criterias);
  const setCriteria = criteriaStore((state) => state.setCriteria);
  const setMarkers = mapStore((state) => state.setMarkers);
  const setMapZoom = mapStore((state) => state.setMapZoom);
  const setMapCenter = mapStore((state) => state.setMapCenter);
  // const [inputs, setInputs] = useState(criterias);
  const [departementSelected, setDepartementSelected] = useState([]);
  const [regionsSelected, setRegionsSelected] = useState([]);
  const [schoolsSelected, setSchoolsSelected] = useState([]);

  const [inputs, setInputs] = useState({
    populationmin: '0',
    populationmax: '3000',
    code_departement: [],
    code_region: [],
    type_ecole: [],
    type_personal_health: [],
    type_health_institution: [],
  });

  const [isOnHealthPersonal, setIsOnHealthPersonal] = useState({
    doctor: false,
    cardiologistic: false,
    dentist: false,
    dermatologist: false,
    ophtalmologist: false,
    pediatrician: false,
    pulmonologist: false,
    psychiatrist: false,
    midwife: false,
  });

  const [isOnHealthInstitute, setIsOnHealthInstitute] = useState({
    hospital: false,
    healthCenter: false,
    nursery: false,
    pharmacy: false,
  });

  const handleToggle = (category) => {
    setIsOnHealthInstitute((state) => ({
      ...state,
      [category]: !state[category],
    }));
    setIsOnHealthPersonal((state) => ({
      ...state,
      [category]: !state[category],
    }));
  };

  const spring = {
    type: 'spring',
    stiffness: 300,
    damping: 5,
  };

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
    const healthInstituteKeys = Object.keys(isOnHealthInstitute);
    const healthPersonalKeys = Object.keys(isOnHealthPersonal);
    const healthPersonal = healthPersonalKeys.filter(
      (key) => isOnHealthPersonal[key]
    );
    const healthInstitute = healthInstituteKeys.filter(
      (key) => healthInstituteKeys[key]
    );
    try {
      const items = {
        populationmin: inputs.populationmin,
        populationmax: inputs.populationmax,
      };
      if (departementSelected.length) {
        items.code_departement = departementSelected.map((dep) => dep.value);
      }
      if (regionsSelected.length) {
        items.code_region = regionsSelected.map((dep) => dep.value);
      }
      if (schoolsSelected.length) {
        items.type_ecole = schoolsSelected.map((dep) => dep.value);
      }
      if (healthPersonal.length) {
        items.type_personal_health = healthPersonal;
      }
      if (healthInstitute.length) {
        items.type_health_institution = healthInstitute;
      }
      const { data } = await API.getCityWithCriteria(items);
      setCities(data);
      const cityMarkers = data.map((city) => ({
        name: city.city_name,
        type: 'city',
        coords: [city.coordinates.x, city.coordinates.y],
      }));
      setMarkers(cityMarkers);
      setMapZoom(7);
      setMapCenter(data[0].coordinates.x, data[0].coordinates.y);
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
        <div className="criteria__form__container">
          <section className="range-slider">
            <label className="criteria__form__label rangeValues">
              Choisir le nombre d&apos;habitants
            </label>
            <br />
            <br />
            <div className="range-slider__span">
              <span>{inputs.populationmin}</span>
              <span>{inputs.populationmax}</span>
            </div>
            <div className="range-slider__input">
              <input
                name="populationmin"
                defaultValue={criterias.populationmin}
                value={inputs.populationmin}
                min="0"
                max="2500000"
                step="100"
                type="range"
                onChange={handleChange}
              />
              <input
                name="populationmax"
                defaultValue={criterias.populationmax}
                value={inputs.populationmax}
                min="0"
                max="2500000"
                step="100"
                type="range"
                onChange={handleChange}
              />
            </div>
          </section>
          <br />

          <section className="departements">
            <label className="criteria__form__label" htmlFor="code_departement">
              Choisir un département
            </label>
            <div className="criteria__form__multiselect">
              <MultiSelect
                options={departementsSelect}
                value={departementSelected}
                onChange={setDepartementSelected}
                labelledBy="Select"
                overrideStrings={{
                  allItemsAreSelected: 'Tous les départements',
                  clearSearch: 'Vider la recherche',
                  noOptions: "Pas d'options",
                  search: 'Rechercher',
                  selectAll: 'Tout sélectionner',
                  selectAllFiltered: 'Tout sélectionner (Filtré)',
                  selectSomeItems: 'Tout sélectionner...',
                }}
              />
            </div>
          </section>
          <br />
          <section className="regions">
            <label className="criteria__form__label" htmlFor="code_region">
              Choisir une région
            </label>
            <div className="criteria__form__multiselect">
              <MultiSelect
                options={regionsSelect}
                value={regionsSelected}
                onChange={setRegionsSelected}
                labelledBy="Select"
                overrideStrings={{
                  allItemsAreSelected: 'Toutes les régions',
                  clearSearch: 'Vider la recherche',
                  noOptions: "Pas d'options",
                  search: 'Rechercher',
                  selectAll: 'Tout sélectionner',
                  selectAllFiltered: 'Tout sélectionner (Filtré)',
                  selectSomeItems: 'Tout sélectionner...',
                }}
              />
            </div>
          </section>

          <br />
          <section className="schools">
            <label className="criteria__form__label" htmlFor="type_ecole">
              Choisir le type d&apos;école
            </label>
            <div className="criteria__form__multiselect">
              <MultiSelect
                options={schoolsSelect}
                value={schoolsSelected}
                onChange={setSchoolsSelected}
                labelledBy="Select"
                overrideStrings={{
                  allItemsAreSelected: "Tous les types d'établissements",
                  clearSearch: 'Vider la recherche',
                  noOptions: "Pas d'options",
                  search: 'Rechercher',
                  selectAll: 'Tout sélectionner',
                  selectAllFiltered: 'Tout sélectionner (Filtré)',
                  selectSomeItems: 'Tout sélectionner...',
                }}
              />
            </div>
          </section>

          <div className="pharmacy">
            <div className="choice">
              <div
                className="switch"
                data-isOn={isOnHealthInstitute.pharmacy}
                onClick={() => handleToggle('pharmacy')}
              >
                <motion.div className="handle" layout transition={spring} />
              </div>
              <span>Pharmacies</span>
            </div>
          </div>
          <div className="hospital">
            <div className="choice">
              <div
                className="switch"
                data-isOn={isOnHealthInstitute.hospital}
                onClick={() => handleToggle('hospital')}
              >
                <motion.div className="handle" layout transition={spring} />
              </div>
              <span>Centres Hospitaliers</span>
            </div>
          </div>
          <div className="doctor">
            <div className="choice">
              <div
                className="switch"
                data-isOn={isOnHealthPersonal.doctor}
                onClick={() => handleToggle('doctor')}
              >
                <motion.div className="handle" layout transition={spring} />
              </div>
              <span>Médecins généralistes</span>
            </div>
          </div>
          <div className="nursery">
            <div className="choice">
              <div
                className="switch"
                data-isOn={isOnHealthInstitute.nursery}
                onClick={() => handleToggle('nursery')}
              >
                <motion.div className="handle" layout transition={spring} />
              </div>
              <span>Crèches/Garderies</span>
            </div>
          </div>
          <div className="dentist">
            <div className="choice">
              <div
                className="switch"
                data-isOn={isOnHealthPersonal.dentist}
                onClick={() => handleToggle('dentist')}
              >
                <motion.div className="handle" layout transition={spring} />
              </div>
              <span>Dentistes</span>
            </div>
          </div>
          <div className="cardiologist">
            <div className="choice">
              <div
                className="switch"
                data-isOn={isOnHealthPersonal.cardiologist}
                onClick={() => handleToggle('cardiologist')}
              >
                <motion.div className="handle" layout transition={spring} />
              </div>
              <span>Cardiologues</span>
            </div>
          </div>
          <div className="dermatologist">
            <div className="choice">
              <div
                className="switch"
                data-isOn={isOnHealthPersonal.dermatologist}
                onClick={() => handleToggle('dermatologist')}
              >
                <motion.div className="handle" layout transition={spring} />
              </div>
              <span>Dermatologues</span>
            </div>
          </div>
          <div className="ophtalmologist">
            <div className="choice">
              <div
                className="switch"
                data-isOn={isOnHealthPersonal.ophtalmologist}
                onClick={() => handleToggle('ophtalmologist')}
              >
                <motion.div className="handle" layout transition={spring} />
              </div>
              <span>Ophtalmologues</span>
            </div>
          </div>
          <div className="pediatrician">
            <div className="choice">
              <div
                className="switch"
                data-isOn={isOnHealthPersonal.pediatrician}
                onClick={() => handleToggle('pediatrician')}
              >
                <motion.div className="handle" layout transition={spring} />
              </div>
              <span>Pédiatres</span>
            </div>
          </div>
          <div className="pulmonologist">
            <div className="choice">
              <div
                className="switch"
                data-isOn={isOnHealthPersonal.pulmonologist}
                onClick={() => handleToggle('pulmonologist')}
              >
                <motion.div className="handle" layout transition={spring} />
              </div>
              <span>Pneumologues</span>
            </div>
          </div>
          <div className="psychiatrist">
            <div className="choice">
              <div
                className="switch"
                data-isOn={isOnHealthPersonal.psychiatrist}
                onClick={() => handleToggle('psychiatrist')}
              >
                <motion.div className="handle" layout transition={spring} />
              </div>
              <span>Psychiatres</span>
            </div>
          </div>
          <div className="midwife">
            <div className="choice">
              <div
                className="switch"
                data-isOn={isOnHealthPersonal.midwife}
                onClick={() => handleToggle('midwife')}
              >
                <motion.div className="handle" layout transition={spring} />
              </div>
              <span>Sages-femmes</span>
            </div>
          </div>
          <div className="healthCenter">
            <div className="choice">
              <div
                className="switch"
                data-isOn={isOnHealthInstitute.healthCenter}
                onClick={() => handleToggle('healthCenter')}
              >
                <motion.div className="handle" layout transition={spring} />
              </div>
              <span>Centres de soins</span>
            </div>
          </div>
        </div>
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
