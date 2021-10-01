/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import API from '../../api';
import useWindowSize from '../../hooks/useWindowSize';
import Form from '../Shared/Form';
import Input from '../Shared/Input';
import inscription from '../../assets/images/inscription.jpg';
import './styles.scss';
import AutoSuggest from '../AutoSuggest';

const initialInputs = {
  firstname: '',
  lastname: '',
  city: '',
  email: '',
  password: '',
  password_confirm: '',
};

const Inscription = () => {
  const history = useHistory();
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

  const clearInput = (id) => {
    setInputs((state) => ({
      ...state,
      [id]: '',
    }));
  };

  const setCity = (data) => {
    setInputs((state) => ({
      ...state,
      city: data ? data.code_insee : '',
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputsKeys = Object.keys(inputs);
    inputsKeys.forEach((key) => {
      if (!inputs[key].trim().length) {
        // eslint-disable-next-line no-console
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
        // eslint-disable-next-line no-console
        console.log(data);
        setInputs({ ...initialInputs });
        history.push('/');
      } catch (err) {
        // eslint-disable-next-line no-console
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
            onClear={clearInput}
          />
          <Input
            type="text"
            id="lastname"
            labelText="Nom"
            value={inputs.lastname}
            onChange={handleChange}
            onClear={clearInput}
          />
          <AutoSuggest limit={10} onSelected={setCity} inForm />
          <Input
            type="email"
            id="email"
            labelText="Email"
            value={inputs.email}
            onChange={handleChange}
            onClear={clearInput}
          />
          <Input
            type="password"
            id="password"
            labelText="Mot de passe"
            value={inputs.password}
            onChange={handleChange}
            onClear={clearInput}
          />
          <Input
            type="password"
            id="password_confirm"
            labelText="Confirmation du mot de passe"
            value={inputs.password_confirm}
            onChange={handleChange}
            onClear={clearInput}
          />
          <button type="submit" className="inscription__form-group-button">
            S'enregistrer
          </button>
        </Form>
        {!isMobile && (
          <div>
            <img
              className="inscription__logo"
              src={inscription}
              alt="img-inscription"
            />
            <span>
              <p>
                Créez un compte pour pouvoir bénéficier de toutes les
                fonctionnalités de l'application ou{' '}
                <NavLink className="inscription__link" to="/connexion">
                  connectez-vous
                </NavLink>
              </p>
            </span>
          </div>
        )}
      </section>
    </div>
  );
};

export default Inscription;
