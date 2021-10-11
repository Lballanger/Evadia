const Joi = require('joi');

const schema = {
  findId: Joi.object({
    id: Joi.number().required(),
  }),
};

module.exports = schema;
