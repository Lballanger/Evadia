import React, { useState } from 'react';
import toast from 'react-hot-toast';
import API from '../../api';
import Form from '../Shared/Form';
import Input from '../Shared/Input';
import './styles.scss';

const ForgottenPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await API.forgotPassword({
        email,
        redirectUrl: 'http://localhost:3000/new-password',
      });
      if (!data || data.status !== 200) throw new Error('User not found');
      toast.success(`Un email avec un lien a été envoyé à l'adresse ${email}`, {
        duration: 10000,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="forgoten-password">
      <div className="koho">
        <div className="forgoten-password__title">MOT DE PASSE OUBLIE</div>
      </div>
      <section className="forgoten-password__section">
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            id="email"
            labelText="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <button
            type="submit"
            className="forgoten-password__form-group-button"
          >
            Valider
          </button>
        </Form>
      </section>
    </div>
  );
};

export default ForgottenPassword;
