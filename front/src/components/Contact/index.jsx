/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import API from '../../api';
import userStore from '../../store/user';
import Form from '../Shared/Form';
import Input from '../Shared/Input';
import Textarea from '../Shared/Textarea';

import './styles.scss';

const initialInputs = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const Contact = () => {
  const user = userStore((state) => state.user);
  const [inputs, setInputs] = useState(initialInputs);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const clearInput = (id) => {
    setInputs((state) => ({
      ...state,
      [id]: '',
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // TODO: Add logic - Send data to api
    try {
      const data = await API.doContact(inputs);
      toast.success('Nous avons bien reçu votre message');
      setInputs({ ...initialInputs });
      console.log(data);
    } catch (error) {
      console.log('error contact', error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      setInputs((state) => ({
        ...state,
        email: user.email,
        name: user.firstname,
      }));
    }
  }, [user]);

  return (
    <div className="contact">
      <div className="koho">
        <div className="contact__title">CONTACT</div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Input
          id="name"
          value={inputs.name}
          onChange={handleChange}
          onClear={clearInput}
          labelText="Votre nom"
          placeholder="Entrez votre nom"
          type="text"
        />
        <Input
          id="email"
          value={inputs.email}
          onChange={handleChange}
          onClear={clearInput}
          labelText="Votre email"
          placeholder="ex: mon@email.com"
          type="email"
        />
        <Input
          id="subject"
          value={inputs.subject}
          onChange={handleChange}
          onClear={clearInput}
          labelText="Sujet du message"
          placeholder="ex: prise de contact ou Signalement d'un problème"
          type="text"
        />
        <Textarea
          id="message"
          value={inputs.message}
          onChange={handleChange}
          onClear={clearInput}
          labelText="Votre message"
        />
        <button type="submit" className="contact__form-group-button">
          Envoyer
        </button>
        {/* <input className="submit" type="submit" value="Envoyer" /> */}
      </Form>
    </div>
  );
};

export default Contact;
