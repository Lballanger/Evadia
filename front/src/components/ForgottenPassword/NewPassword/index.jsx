/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
import API from '../../../api';
import Input from '../../Shared/Input';
import Form from '../../Shared/Form';

const formContainer = {
  width: '100%',
  maxWidth: '800px',
  padding: '8rem 1rem',
  margin: '0 auto',
};

const initialInputs = {
  password: '',
  passwordConfirm: '',
};

const NewPassword = () => {
  const token = new URLSearchParams(useLocation().search).get('token');
  const history = useHistory();
  const [inputs, setInputs] = useState(initialInputs);
  const [errors, setErrors] = useState({});
  const [isValidForm, setIsValidForm] = useState(false);

  useEffect(() => {
    if (!token) {
      history.replace('/404');
    }
  }, [token]);

  const handleChange = (event) => {
    if (Object.keys(errors).length) {
      setErrors((state) => {
        const copy = { ...state };
        delete copy[event.target.name];
        return copy;
      });
    }
    const errorsObj = { ...errors };
    const passwordTest =
      /^.*(?=.{6,120})(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\@\#\$\%\^\&\*\(\)\-\=\¡\£\_\+\`\~\.\,\<\>\/\?\;\:\'\"\\\|\[\]\{\}]).*$/;
    switch (event.target.name) {
      case 'password':
        if (!passwordTest.test(event.target.value))
          errorsObj.password =
            'Votre mot de passe doit doit avoir au minimum 6 caractères contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial (!@#$%^&*()-=¡£_+`~.,<>/?;:\'"\\|[]{})';
        else if (errorsObj.password) delete errorsObj.password;
        break;
      case 'passwordConfirm':
        if (inputs.password.length && event.target.value !== inputs.password)
          errorsObj.passwordConfirm =
            'La confirmation du mot de passe ne correspond pas au mot de passe saisi';
        else if (errorsObj.passwordConfirm) delete errorsObj.passwordConfirm;
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await API.sendNewPassword(inputs, token);
      if (!data) {
        toast.error("Quelque chose s'est mal passé");
      } else {
        toast.success(
          'Votre mot de passe a bien été pris en compte, vous pouvez maintenant vous connecter',
          { duration: 4000 }
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.message);
      if (error.response.status === 401) {
        toast.error(
          'Votre token est expiré, vous devez refaire une demande pour changer votre mot de passe',
          { duration: 4000 }
        );
        history.push('/connexion');
      } else {
        toast.error(error.message, { duration: 4000 });
      }
    }
  };

  const clearInput = (id) => {
    setInputs((state) => ({
      ...state,
      [id]: '',
    }));
  };

  return (
    <div style={formContainer}>
      <h2>Créez votre nouveau mot de passe</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          id="password"
          type="password"
          value={inputs.password}
          onChange={handleChange}
          labelText="Mot de passe"
          onClear={clearInput}
          error={errors?.password}
        />
        <Input
          id="passwordConfirm"
          type="password"
          value={inputs.passwordConfirm}
          onChange={handleChange}
          labelText="Confirmation du mot de passe"
          onClear={clearInput}
          error={errors?.passwordConfirm}
        />
        <button
          type="submit"
          className="inscription__form-group-button"
          disabled={!isValidForm}
        >
          Envoyer
        </button>
      </Form>
    </div>
  );
};

export default NewPassword;
