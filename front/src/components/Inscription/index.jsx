/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import API from '../../api';
import Footer from '../Footer';
import Header from '../Header';
import Form from '../Shared/Form';
import Input from '../Shared/Input';
import './styles.scss';

const initialInputs = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  password_confirm: '',
};

const Inscription = () => {
  const [inputs, setInputs] = useState({ ...initialInputs });
  const [errors, setErrors] = useState({});

  const handleChange = async (event) => {
    if (errors) {
      setErrors((state) => {
        const copy = { ...state };
        delete copy[event.target.name];
        return copy;
      });
    }
    setInputs((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputsKeys = Object.keys(inputs);
    inputsKeys.forEach((key) => {
      if (!inputs[key].trim().length) {
        console.log('set error to', key);
        setErrors((state) => ({
          ...state,
          [key]: `${key} est obligatoire`,
        }));
      }
    });
    if (inputs.password !== inputs.password_confirm) {
      setErrors((state) => ({
        ...state,
        password_confirm:
          'Le mot de passe de confirmation ne match pas avec le mot de passe saisi.',
      }));
    }
    if (Object.keys(errors).length === 0) {
      try {
        const data = await API.doRegister(inputs);
        console.log(data);
        setInputs({ ...initialInputs });
      } catch (err) {
        console.log('Error register', err);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="inscription">
        <div className="inscription__title">INSCRIPTION</div>
        {JSON.stringify(errors)}
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            id="firstname"
            labelText="Prénom"
            value={inputs.firstname}
            onChange={handleChange}
          />
          <Input
            type="text"
            id="lastname"
            labelText="Nom"
            value={inputs.lastname}
            onChange={handleChange}
          />
          <Input
            type="email"
            id="email"
            labelText="Email"
            value={inputs.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            id="password"
            labelText="Mot de passe"
            value={inputs.password}
            onChange={handleChange}
          />
          <Input
            type="password"
            id="password_confirm"
            labelText="Confirmation du mot de passe"
            value={inputs.password_confirm}
            onChange={handleChange}
          />
          <button type="submit">S'enregistrer</button>
        </Form>
        {/* <form className="inscription__form">
        <div className="inscription__form__lastname">
          <p>Nom</p>
          <input type="text" />
        </div>
        <div className="inscription__form__firstname">
          <p>Prénom</p>
          <input type="text" />
        </div>
        <div className="inscription__form__city">
          <p>Ville</p>
          <input type="text" />
        </div>
        <div className="inscription__form__email">
          <p>Email</p>
          <input type="email" />
        </div>
        <div className="inscription__form__password">
          <p>Mot de passe</p>
          <input type="password" />
        </div>
        <div className="inscription__form__confirm">
          <p>Confirmation du mot de passe</p>
          <input type="password" />
        </div>
        <div className="inscription__form__readLegals">
          <input
            className="inscription__form__readLegals__checkbox"
            type="checkbox"
          />
          <span className="inscription__form__readLegals__title">
            J'ai lu les
            <NavLink
              className="inscription__form__readLegals__link"
              type="button"
              to="/legals"
            >
              CGU
            </NavLink>
          </span>
        </div>

        <div className="inscription__form__alreadyAccount">
          <span className="inscription__form__alreadyAccount__title">
            J'ai déjà un compte,
          </span>
          <NavLink
            className="inscription__form__alreadyAccount__link"
            type="button"
            to="/connexion"
          >
            Je me connecte
          </NavLink>
        </div>
        <div className="inscription__form__alreadyAccount__submit">
          <button type="submit">S'inscrire</button>
        </div>
      </form> */}
      </div>
      <Footer />
    </>
  );
};

export default Inscription;
