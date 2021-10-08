const Joi = require('joi');

// schema made for findByName
const schema = {
  findCodeInsee: Joi.object({
    code_insee: Joi.string().min(5).max(5).required(),
  }),

  findByCriteria: Joi.object({
    populationmin: Joi.string().required(),
    populationmax: Joi.string().required(),
    code_departement: Joi.array().max(5).items(Joi.string()),
    code_region: Joi.array().max(5).items(Joi.string()),
    type_ecole: Joi.array().max(3).items(Joi.string()),
    type_personal_health: Joi.array().max(30).items(Joi.string()),
    type_health_institution: Joi.array().max(40).items(Joi.string()),
  }),

  boolean: Joi.object({
    boolean: Joi.boolean(),
  }),
};

module.exports = schema;
