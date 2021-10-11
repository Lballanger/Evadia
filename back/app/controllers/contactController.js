const Contact = require('../models/contact');
const sanitizer = require('sanitizer');
const mailer = require('../services/nodemailer');

const contactController = {
  getAll: async (request, response) => {
    const { offset = 0, limit = 10 } = request.query;
    try {
      const messages = await Contact.getAll(offset, limit);
      return response.json(messages);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  },
  getOne: async (request, response) => {
    const { id } = request.params;
    try {
      const message = await Contact.getOne(id);
      if (!message) return response.status(404).json('Message not found');
      return response.json(message);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  },
  create: async (request, response) => {
    let { body } = request;

    for (let propName in request.body) {
      request.body[propName] = sanitizer.escape(request.body[propName]);
  };

    try {
      const message = await new Contact(body).create();
      if (!message)
        return response.status(400).json({
          error: true,
          message: 'Something goes wrong with provided data',
        });

      console.log(message);
      // TODO: Send the mail
      const params = {
        sender : 'evadia.apo@gmail.com',
        email: message.email,
        type : 'contact',
        username: message.name,
        subject:  message.subject,
        message: message.message
      }
      await mailer(params);

      return response.status(201).json(message);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  },
  update: async (request, response) => {
    const { id } = request.params;
    try {
      const message = await Contact.getOne(id);
      if (!message) return response.status(404).json('Message not found');
      const updatedMessage = await message.updateSeen();
      return response.json(updatedMessage);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  },
  delete: async (request, response) => {
    const { id } = request.params;
    try {
      const message = await Contact.getOne(id);
      if (!message) return response.status(404).json('Message not found');
      await message.delete();
      return response.json('Message deleted');
    } catch (error) {
      return response.status(500).json(error.message);
    }
  },
};

module.exports = contactController;
