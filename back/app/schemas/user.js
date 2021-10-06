const Joi = require('joi');

const schema = {
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).trim().regex(new RegExp()).required(),
  }),
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).trim().regex(new RegExp()).required(),
    password_confirm: Joi.string().valid(Joi.ref('password')).required(),
    firstname: Joi.string().min(2).required(),
    lastname: Joi.string().min(2).required(),
    city: Joi.string().length(5).required(),
  }),
  forgotPassword: Joi.object({
    email: Joi.string().email().required(),
  }),
};

module.exports = schema;
