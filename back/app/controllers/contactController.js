const Contact = require('../models/contact');
const sanitizer = require('sanitizer');

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
      console.log('Sanitizer avant :', request.body[propName]);
      request.body[propName] = sanitizer.escape(request.body[propName]);
      console.log('Sanitizer après :', request.body[propName]);
  };

    try {
      const message = await new Contact(body).create();
      if (!message)
        return response.status(400).json({
          error: true,
          message: 'Something goes wrong with provided data',
        });

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
