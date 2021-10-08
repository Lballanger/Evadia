/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../../api';
import cityStore from '../../store/city';
import mapStore from '../../store/map';
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
  const setMarkers = mapStore((state) => state.setMarkers);
  const setMapZoom = mapStore((state) => state.setMapZoom);
  const setMapCenter = mapStore((state) => state.setMapCenter);
  const [inputs, setInputs] = useState(criterias);

  const [isOn, setIsOn] = useState({
    pharmacy: false,
    doctor: false,
    cardiologistic: false,
    hospital: false,
    dentist: false,
    dermatologist: false,
    ophtalmologist: false,
    pediatrician: false,
    pulmonologist: false,
    psychiatrist: false,
    midwife: false,
    healthCenter: false,
    nursery: false,
  });

  const handleToggle = (category) => {
    setIsOn((state) => ({
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
    try {
      const items = {
        populationmin: '400',
        populationmax: '1000',
        code_departement: ['39', '01'],
        code_region: ['27', '84'],
        type_ecole: ['Ecole'],
        // type_personal_health: [],
        // type_health_institution: [],
      };
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
          <div>
            <section className="range-slider">
              <label className="rangeValues">
                Choisir le nombre d&apos;habitants
              </label>
              <br />
              <br />
              <span className="range-slider__span">
                Minimum: {inputs.populationmin} - Maximum:{' '}
                {inputs.populationmax}
              </span>
              <div className="range-slider__input">
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
              </div>
            </section>
            <br />
            <div className="localisation">
              <section className="departements">
                <label htmlFor="code_departement">Choisir un département</label>
                <div className="select">
                  <select
                    id="code_departement"
                    name="code_departement"
                    onChange={handleChange}
                    multiple
                  >
                    <option value={null}>Aucun département</option>
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
                    <option value={null}>Aucune Région</option>
                    {regionsWithDepartements.map((region) => (
                      <option
                        value={region.reg_code}
                        key={region.reg_code}
                        selected={criterias.code_region.includes(
                          region.reg_code
                        )}
                      >
                        {region.reg_name}
                      </option>
                    ))}
                  </select>
                  <span className="focus" />
                </div>
              </section>
            </div>
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
                  <option value={null}>Aucun établissement</option>
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
          </div>
          <section className="health">
            <label />
            <div className="Pharmacy">
              <div className="choice">
                <div
                  className="switch"
                  data-isOn={isOn.pharmacy}
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
                  data-isOn={isOn.hospital}
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
                  data-isOn={isOn.doctor}
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
                  data-isOn={isOn.nursery}
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
                  data-isOn={isOn.dentist}
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
                  data-isOn={isOn.cardiologist}
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
                  data-isOn={isOn.dermatologist}
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
                  data-isOn={isOn.ophtalmologist}
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
                  data-isOn={isOn.pediatrician}
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
                  data-isOn={isOn.pulmonologist}
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
                  data-isOn={isOn.psychiatrist}
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
                  data-isOn={isOn.midwife}
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
                  data-isOn={isOn.healthCenter}
                  onClick={() => handleToggle('healthCenter')}
                >
                  <motion.div className="handle" layout transition={spring} />
                </div>
                <span>Centres de soins</span>
              </div>
            </div>
          </section>
          <p />
          <p />
          <p />
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
