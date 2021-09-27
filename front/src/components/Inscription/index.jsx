/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import API from '../../api';
import useWindowSize from '../../hooks/useWindowSize';
import Form from '../Shared/Form';
import Input from '../Shared/Input';
import './styles.scss';

const initialInputs = {
  firstname: '',
  lastname: '',
  city: '',
  email: '',
  password: '',
  password_confirm: '',
};

const Inscription = () => {
  const [inputs, setInputs] = useState({ ...initialInputs });
  const [errors, setErrors] = useState({});
  const { isMobile } = useWindowSize();

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
    <div className="inscription">
      <div className="inscription__title">INSCRIPTION</div>
      <section className="inscription__section">
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
            type="text"
            id="city"
            labelText="Ville"
            value={inputs.city}
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
          <button type="submit" className="inscription__form-group-button">
            S'enregistrer
          </button>
        </Form>
        {!isMobile && (
          <div>
            <img src="" alt="img-inscription" />
            <span>
              <p>
                Créez un compte pour pouvoir bénéficier de toutes les
                fonctionnalités de l'application ou{' '}
              </p>
              <NavLink to="/connexion">connectez-vous</NavLink>
            </span>
          </div>
        )}
      </section>
    </div>
  );
};

export default Inscription;
