/* eslint-disable no-console */
import React, { useState } from 'react';
import API from '../../api';
import Form from '../Shared/Form';
import Input from '../Shared/Input';
import Textarea from '../Shared/Textarea';

import './styles.scss';

const initialInputs = {
  name: '',
  email: '',
  message: '',
};

const Contact = () => {
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
      setInputs({ ...initialInputs });
      console.log(data);
    } catch (err) {
      console.log('error contact', err);
    }
  };

  return (
    <div className="contact">
      <div className="inscription__title">CONTACT</div>
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
