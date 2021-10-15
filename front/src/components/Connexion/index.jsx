import React, { useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';

import './styles.scss';
import Form from '../Shared/Form';
import Input from '../Shared/Input';
import API from '../../api';
import userStore from '../../store/user';
import cityStore from '../../store/city';
import useWindowSize from '../../hooks/useWindowSize';
import login from '../../assets/images/Login.png';

const initialInputs = {
  email: '',
  password: '',
};

const Connexion = () => {
  const history = useHistory();
  const [inputs, setInputs] = useState({ ...initialInputs });
  const setUser = userStore((state) => state.setUser);
  const setFavorites = cityStore((state) => state.setFavorites);
  const { isMobile } = useWindowSize();

  const inputChange = (event) => {
    setInputs((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await API.doLogin(inputs);
      toast.success('Vous êtes connecté');
      setFavorites(data.favorites);
      setUser(data);
      setInputs({ ...initialInputs });
      history.push('/');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="connexion">
      <div className="koho">
        <div className="connexion__title">CONNEXION</div>
      </div>
      <section className="connexion__section">
        {!isMobile && (
          <div>
            <img className="connexion__logo" src={login} alt="img-connexion" />
            <span>
              <p>
                Connectez-vous pour accéder à votre compte, ou
                <NavLink className="connexion__link" to="/inscription">
                  créez un compte
                </NavLink>
              </p>
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
