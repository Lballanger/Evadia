/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MultiSelect } from 'react-multi-select-component';
import { IoLockClosed } from 'react-icons/io5';
import API from '../../api';
import cityStore from '../../store/city';
import mapStore from '../../store/map';
import criteriaStore from '../../store/criteria';
import departements from '../../assets/data/departements-region.json';
import regionsWithDepartements from '../../assets/data/regions_with_departements.json';
import userStore from '../../store/user';

import './styles.scss';
import Loader from '../Shared/Loader';

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
  const user = userStore((state) => state.user);
  const setCities = cityStore((state) => state.setCities);
  const criterias = criteriaStore((state) => state.criterias);
  const setCriteria = criteriaStore((state) => state.setCriteria);
  const setMarkers = mapStore((state) => state.setMarkers);
  const setMapZoom = mapStore((state) => state.setMapZoom);
  const setMapCenter = mapStore((state) => state.setMapCenter);
  const [isLoading, setIsLoading] = useState(false);

  const updateDepartements = (e) => {
    setCriteria('code_departement', e);
  };

  const updateRegions = (e) => {
    setCriteria('code_region', e);
  };

  const updateSchools = (e) => {
    setCriteria('type_ecole', e);
  };

  const handleInstituteToggle = (category) => {
    setCriteria('type_health_institution', {
      ...criterias.type_health_institution,
      [category]: !criterias.type_health_institution[category],
    });
  };

  const handlePersonalToggle = (category) => {
    setCriteria('type_personal_health', {
      ...criterias.type_personal_health,
      [category]: !criterias.type_personal_health[category],
    });
  };

  const spring = {
    type: 'spring',
    stiffness: 300,
    damping: 5,
  };

  const handleChange = (event) => {
    if (
      event.target.name === 'populationmax' &&
      +event.target.value <= +criterias.populationmin
    )
      return;
    if (
      event.target.name === 'populationmin' &&
      +event.target.value >= +criterias.populationmax
    )
      return;
    setCriteria(event.target.name, event.target.value);
  };

  const handleSumbit = async (event) => {
    event.preventDefault();
    const healthInstituteKeys = Object.keys(criterias.type_health_institution);
    const healthPersonalKeys = Object.keys(criterias.type_personal_health);
    const healthPersonal = healthPersonalKeys.filter(
      (key) => criterias.type_personal_health[key]
    );
    const healthInstitute = healthInstituteKeys.filter(
      (key) => criterias.type_health_institution[key]
    );
    try {
      const items = {
        populationmin: criterias.populationmin,
        populationmax: criterias.populationmax,
      };
      if (criterias.code_departement.length) {
        items.code_departement = criterias.code_departement.map(
          (dep) => dep.value
        );
      }
      if (criterias.code_region.length) {
        items.code_region = criterias.code_region.map((dep) => dep.value);
      }
      if (criterias.type_ecole.length) {
        items.type_ecole = criterias.type_ecole.map((dep) => dep.value);
      }
      if (healthPersonal.length) {
        items.type_personal_health = healthPersonal;
      }
      if (healthInstitute.length) {
        items.type_health_institution = healthInstitute;
      }
      setIsLoading(true);
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
      // eslint-disable-next-line no-console
      console.log('Error get by criteria: ', error.response.data);
      // Afficher une popup si il y a une erreur
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="criteria__container">
      <h1 className="koho">Recherche selon vos critères</h1>
      <div className={`${!user ? 'criteria__h2__disconnect' : 'criteria__h2'}`}>
        {!user ? (
          <h2 className="criteria__h2__disconnect">
            {!user ? (
              <IoLockClosed className="criteria__h2__disconnect__locked" />
            ) : null}
            Vous devez être connecté pour accéder à ces critères.
          </h2>
        ) : null}
      </div>

      <form onSubmit={handleSumbit} className="criteria">
        <div className="criteria__form__container">
          <section className="range-slider">
            <label className="criteria__form__label rangeValues">
              Choisir le nombre d&apos;habitants
            </label>
            <br />
            <br />
            <div className="range-slider__span">
              <span>{criterias.populationmin}</span>
              <span>{criterias.populationmax}</span>
            </div>
            <div className="range-slider__input">
              <input
                name="populationmin"
                value={criterias.populationmin}
                min="0"
                max="2500000"
                step="100"
                type="range"
                onChange={handleChange}
              />
              <input
                name="populationmax"
                value={criterias.populationmax}
                min="0"
                max="2500000"
                step="100"
                type="range"
                onChange={handleChange}
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
                value={criterias.code_region}
                onChange={updateRegions}
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
          <section className="departements">
            <label className="criteria__form__label" htmlFor="code_departement">
              Choisir un département
            </label>
            <div className="criteria__form__multiselect">
              <MultiSelect
                options={departementsSelect}
                value={criterias.code_departement}
                onChange={updateDepartements}
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
          <section className="schools">
            <label className="criteria__form__label" htmlFor="type_ecole">
              Choisir le type d&apos;école
            </label>
            <div className="criteria__form__multiselect">
              <MultiSelect
                options={schoolsSelect}
                value={criterias.type_ecole}
                onChange={updateSchools}
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
                data-isOn={criterias.type_health_institution.pharmacie}
                onClick={() => handleInstituteToggle('pharmacie')}
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
                data-isOn={
                  criterias.type_health_institution['centre hospitalier']
                }
                onClick={() => handleInstituteToggle('centre hospitalier')}
              >
                <motion.div className="handle" layout transition={spring} />
              </div>
              <span>Centres Hospitaliers</span>
            </div>
          </div>

          <div
            className="doctor"
            title={user ? '' : 'Vous devez vous connecter'}
          >
            <div className={`choice ${!user ? 'choice__blocked' : ''}`}>
              {!user ? <IoLockClosed className="choice__locked" /> : null}
              <div
                className="switch"
                data-isOn={
                  criterias.type_personal_health['Médecin généraliste']
                }
                onClick={() => handlePersonalToggle('Médecin généraliste')}
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
                data-isOn={
                  criterias.type_health_institution['crèche et garderie']
                }
                onClick={() => handleInstituteToggle('crèche et garderie')}
              >
                <motion.div className="handle" layout transition={spring} />
              </div>
              <span>Crèches/Garderies</span>
            </div>
          </div>

          <div
            className="dentist"
            title={user ? '' : 'Vous devez vous connecter'}
          >
            <div className={`choice ${!user ? 'choice__blocked' : ''}`}>
              {!user ? <IoLockClosed className="choice__locked" /> : null}
              <div
                className="switch"
                data-isOn={
                  criterias.type_personal_health['Chirurgien-dentiste']
                }
                onClick={() => handlePersonalToggle('Chirurgien-dentiste')}
              >
                <motion.div className="handle" layout transition={spring} />
              </div>
              <span>Dentistes</span>
            </div>
          </div>

          <div
            className="cardiologist"
            title={user ? '' : 'Vous devez vous connecter'}
          >
            <div className={`choice ${!user ? 'choice__blocked' : ''}`}>
              {!user ? <IoLockClosed className="choice__locked" /> : null}
              <div
                className="switch"
                data-isOn={criterias.type_personal_health.cardiologue}
                onClick={() => handlePersonalToggle('cardiologue')}
              >
                <motion.div className="handle" layout transition={spring} />
              </div>
              <span>Cardiologues</span>
            </div>
          </div>

          <div
            className="dermatologist"
            title={user ? '' : 'Vous devez vous connecter'}
          >
            <div className={`choice ${!user ? 'choice__blocked' : ''}`}>
              {!user ? <IoLockClosed className="choice__locked" /> : null}
              <div
                className="switch"
                data-isOn={
                  criterias.type_personal_health['Dermatologue et vénérologue']
                }
                onClick={() =>
                  handlePersonalToggle('Dermatologue et vénérologue')
                }
              >
                <motion.div className="handle" layout transition={spring} />
              </div>
              <span>Dermatologues</span>
            </div>
          </div>

          <div
            className="ophtalmologist"
            title={user ? '' : 'Vous devez vous connecter'}
          >
            <div className={`choice ${!user ? 'choice__blocked' : ''}`}>
              {!user ? <IoLockClosed className="choice__locked" /> : null}
              <div
                className="switch"
                data-isOn={criterias.type_personal_health.ophtalmologiste}
                onClick={() => handlePersonalToggle('ophtalmologiste')}
              >
                <motion.div className="handle" layout transition={spring} />
              </div>
              <span>Ophtalmologues</span>
            </div>
          </div>

          <div
            className="pediatrician"
            title={user ? '' : 'Vous devez vous connecter'}
          >
            <div className={`choice ${!user ? 'choice__blocked' : ''}`}>
              {!user ? <IoLockClosed className="choice__locked" /> : null}
              <div
                className="switch"
                data-isOn={criterias.type_personal_health.pédiatre}
                onClick={() => handlePersonalToggle('pédiatre')}
              >
                <motion.div className="handle" layout transition={spring} />
              </div>
              <span>Pédiatres</span>
            </div>
          </div>

          <div
            className="pulmonologist"
            title={user ? '' : 'Vous devez vous connecter'}
          >
            <div className={`choice ${!user ? 'choice__blocked' : ''}`}>
              {!user ? <IoLockClosed className="choice__locked" /> : null}
              <div
                className="switch"
                data-isOn={criterias.type_personal_health.pneumologue}
                onClick={() => handlePersonalToggle('pneumologue')}
              >
                <motion.div className="handle" layout transition={spring} />
              </div>
              <span>Pneumologues</span>
            </div>
          </div>

          <div
            className="psychiatrist"
            title={user ? '' : 'Vous devez vous connecter'}
          >
            <div className={`choice ${!user ? 'choice__blocked' : ''}`}>
              {!user ? <IoLockClosed className="choice__locked" /> : null}
              <div
                className="switch"
                data-isOn={criterias.type_personal_health.psychiatre}
                onClick={() => handlePersonalToggle('psychiatre')}
              >
                <motion.div className="handle" layout transition={spring} />
              </div>
              <span>Psychiatres</span>
            </div>
          </div>

          <div
            className="midwife"
            title={user ? '' : 'Vous devez vous connecter'}
          >
            <div className={`choice ${!user ? 'choice__blocked' : ''}`}>
              {!user ? <IoLockClosed className="choice__locked" /> : null}
              <div
                className="switch"
                data-isOn={criterias.type_personal_health['Sage-femme']}
                onClick={() => handlePersonalToggle('Sage-femme')}
              >
                <motion.div className="handle" layout transition={spring} />
              </div>
              <span>Sages-femmes</span>
            </div>
          </div>

          <div
            className="healthCenter"
            title={user ? '' : 'Vous devez vous connecter'}
          >
            <div className={`choice ${!user ? 'choice__blocked' : ''}`}>
              {!user ? <IoLockClosed className="choice__locked" /> : null}
              <div
                className="switch"
                data-isOn={criterias.type_health_institution['Centre de soins']}
                onClick={() => handleInstituteToggle('Centre de soins')}
              >
                <motion.div className="handle" layout transition={spring} />
              </div>
              <span>Centres de soins</span>
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={isLoading ? 'loading' : ''}
        >
          {isLoading ? <Loader /> : 'Lancer la recherche'}
        </button>
      </form>
    </section>
  );
};

export default Criteria;
