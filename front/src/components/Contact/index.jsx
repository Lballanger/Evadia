import React, { useState } from 'react';
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

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Add logic - Send data to api
  };

  return (
    <div className="contact">
      <Form>
        <Input
          id="name"
          value={inputs.name}
          onChange={handleChange}
          labelText="Votre nom"
          placeholder="Entrez votre nom"
          type="text"
        />
        <Input
          id="email"
          value={inputs.email}
          onChange={handleChange}
          labelText="Votre email"
          placeholder="ex: mon@email.com"
          type="email"
        />
        <Textarea
          id="message"
          value={inputs.message}
          onChange={handleChange}
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
