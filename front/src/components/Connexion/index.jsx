import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './styles.scss';
import Form from '../Shared/Form';
import Input from '../Shared/Input';
import API from '../../api';
import userStore from '../../store/user';
import useWindowSize from '../../hooks/useWindowSize';

const initialInputs = {
  email: '',
  password: '',
};

const Connexion = () => {
  const [inputs, setInputs] = useState({ ...initialInputs });
  const setUser = userStore(state => state.setUser);
  const { isMobile } = useWindowSize();

  const inputChange = event => {
    setInputs(state => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const data = await API.doLogin(inputs);
      setUser(data);
      setInputs({ ...initialInputs });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="connexion">
      <div className="connexion__title">CONNEXION</div>
      <section className="connexion__section">
        {!isMobile && (
          <div>
            <img src="" alt="img-connexion" />
            <span>
              <p>Connectez-vous pour accéder à votre compte, ou </p>
              <NavLink to="/inscription">créez un compte</NavLink>
            </span>
          </div>
        )}
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            labelText="Email"
            id="email"
            value={inputs.email}
            onChange={inputChange}
          />
          <Input
            type="password"
            labelText="Mot de passe"
            id="password"
            value={inputs.password}
            onChange={inputChange}
          />
          <button type="submit" className="connexion__form-group-button">
            Se connecter
          </button>
          <Link
            to="/forgottenPassword"
            className="connexion__form__forgottenPassword"
          >
            Mot de passe oublié
          </Link>
        </Form>
      </section>
    </div>
  );
};

export default Connexion;
