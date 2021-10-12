/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-useless-escape */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
import API from '../../api';
import useWindowSize from '../../hooks/useWindowSize';
import Form from '../Shared/Form';
import Input from '../Shared/Input';
import inscription from '../../assets/images/inscription.jpg';
import './styles.scss';
import AutoSuggest from '../AutoSuggest';
import userStore from '../../store/user';

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
  const [isValidForm, setIsValidForm] = useState(false);
  const { isMobile } = useWindowSize();
  const setUser = userStore((state) => state.setUser);

  const handleChange = async (event) => {
    if (Object.keys(errors).length) {
      setErrors((state) => {
        const copy = { ...state };
        delete copy[event.target.name];
        return copy;
      });
    }
    const errorsObj = { ...errors };
    const emailTest =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordTest =
      /^.*(?=.{6,120})(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\@\#\$\%\^\&\*\(\)\-\=\¡\£\_\+\`\~\.\,\<\>\/\?\;\:\'\"\\\|\[\]\{\}]).*$/;
    switch (event.target.name) {
      case 'firstname':
        if (event.target.value.trim().length < 2)
          errorsObj.firstname =
            'Votre prénom doit avoir au minimum 2 caractères';
        else if (errorsObj.firstname) delete errorsObj.firstname;
        break;
      case 'lastname':
        if (event.target.value.trim().length < 2)
          errorsObj.lastname = 'Votre nom doit avoir au minimum 2 caractères';
        else if (errorsObj.lastname) delete errorsObj.lastname;
        break;
      case 'email':
        if (!emailTest.test(event.target.value))
          errorsObj.email = "Votre email n'est pas valide";
        else if (errorsObj.email) delete errorsObj.email;
        break;
      case 'password':
        if (!passwordTest.test(event.target.value))
          errorsObj.password =
            'Votre mot de passe doit doit avoir au minimum 6 caractères contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial (!@#$%^&*()-=¡£_+`~.,<>/?;:\'"\\|[]{})';
        else if (errorsObj.password) delete errorsObj.password;
        break;
      case 'password_confirm':
        if (inputs.password.length && event.target.value !== inputs.password)
          errorsObj.password_confirm =
            'La confirmation du mot de passe ne correspond pas au mot de passe saisi';
        else if (errorsObj.password_confirm) delete errorsObj.password_confirm;
        break;
      default:
        break;
    }
    if (!event.target.value.trim().length) delete errorsObj[event.target.name];
    setErrors(errorsObj);
    const errorsLength = Object.keys(errorsObj).length;
    setInputs((state) => {
      let valid = true;
      Object.values(state).forEach((value) => {
        if (!value.length) valid = false;
      });
      if (!event.target.value.length) valid = false;
      if (errorsLength > 0 || !valid) {
        setIsValidForm(false);
      } else {
        setIsValidForm(true);
      }
      return {
        ...state,
        [event.target.name]: event.target.value,
      };
    });
  };

  const clearInput = (id) => {
    if (errors[id]) delete errors[id];
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
        if (data.email) {
          const { data: userData } = await API.getUser();
          setUser(userData);
        }
        toast.success('Votre compte a bien été créé');
        setInputs({ ...initialInputs });
        history.push('/');
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error register', error);
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="inscription">
      <div className="koho">
        <div className="inscription__title">INSCRIPTION</div>
      </div>
      <section className="inscription__section">
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            id="firstname"
            labelText="Prénom"
            value={inputs.firstname}
            onChange={handleChange}
            onClear={clearInput}
            error={errors.firstname}
          />
          <Input
            type="text"
            id="lastname"
            labelText="Nom"
            value={inputs.lastname}
            onChange={handleChange}
            onClear={clearInput}
            error={errors.lastname}
          />
          <div className="form__auto-suggest">
            <label htmlFor="city" className="inscription__label">
              Votre ville
            </label>
            <AutoSuggest limit={10} onSelected={setCity} inForm />
          </div>
          <Input
            type="email"
            id="email"
            labelText="Email"
            value={inputs.email}
            onChange={handleChange}
            onClear={clearInput}
            error={errors.email}
          />
          <Input
            type="password"
            id="password"
            labelText="Mot de passe"
            value={inputs.password}
            onChange={handleChange}
            onClear={clearInput}
            error={errors.password}
          />
          <Input
            type="password"
            id="password_confirm"
            labelText="Confirmation du mot de passe"
            value={inputs.password_confirm}
            onChange={handleChange}
            onClear={clearInput}
            error={errors.password_confirm}
            disabled={!inputs.password.length || !!errors.password}
            title="Vous devez saisir un mot de passe"
          />
          <button
            type="submit"
            className="inscription__form-group-button"
            disabled={!isValidForm}
          >
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
