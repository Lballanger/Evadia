import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

import './styles.scss';
import Form from '../Shared/Form';
import Input from '../Shared/Input';
import API from '../../api';
import userStore from '../../store/user';

const initialInputs = {
  email: '',
  password: '',
};

const Connexion = () => {
  const [inputs, setInputs] = useState({ ...initialInputs });
  const setUser = userStore((state) => state.setUser);

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
      setUser(data);
      setInputs({ ...initialInputs });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="connexion">
        <div className="connexion__title">CONNEXION</div>
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
          <button type="submit">Se connecter</button>
        </Form>
        {/* <form className="connexion__form">
        <div className="connexion__form__email">
          <p>Email</p>
          <input type="email" />
        </div>
        <div className="connexion__form__password">
          <p>Mot de passe</p>
          <input type="password" />
        </div>
        <div className="connexion__form__remember">
          <input
            className="connexion__form__remember__checkbox"
            type="checkbox"
          />
          <span className="connexion__form__remember__title">
            Se souvenir de moi
          </span>
        </div>
        <div className="connexion__form__submit">
          <button type="submit">Se connecter</button>
        </div>
        <NavLink
          className="connexion__form__forgottenPassword"
          type="button"
          to="/forgottenpassword"
          style={{ textDecoration: 'none' }}
        >
          Mot de passe oublié
        </NavLink>
      </form> */}
      </div>
      <Footer />
    </>
  );
};

export default Connexion;
