const Joi = require('joi');

// schema made for findByName
const schema = Joi.object({
  code_insee: Joi.string().min(5).max(5).required(),
});

module.exports = schema;

// commune = code_insee, code_departement, code_postal,code_region, city_name, longitude, latitude, population
