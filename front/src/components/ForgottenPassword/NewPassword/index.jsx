/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
import API from '../../../api';

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

  useEffect(() => {
    if (!token) {
      history.replace('/404');
    }
  }, [token]);

  const handleChange = (event) => {
    setInputs((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
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
      console.log(error.message);
      toast.error(error.message, { duration: 4000 });
    }
  };

  return (
    <div style={formContainer}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            id="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="passwordConfirm">Confirmation du mot de passe</label>
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            value={inputs.passwordConfirm}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default NewPassword;
