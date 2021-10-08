const Joi = require('joi');

const schema = {
  findId: Joi.object({
    id: Joi.integer().required(),
  }),
};

module.exports = schema;
