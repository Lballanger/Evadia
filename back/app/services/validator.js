module.exports = {
  // eslint-disable-next-line consistent-return
  validateQuery: (schema) => (request, response, next) => {
    const { error } = schema.validate(request.query);
    if (error) {
      return response.status(400).json(error.message);
    }
    next();
  },

  // eslint-disable-next-line consistent-return
  validateBody: (schema) => (request, response, next) => {
    const { error } = schema.validate(request.body);
    if (error) {
      return response.status(400).json(error.message);
    }
    next();
  },

  // eslint-disable-next-line consistent-return
  validateParams: (schema) => (request, response, next) => {
    const { error } = schema.validate(request.params);
    if (error) {
      return response.status(400).json(error.message);
    }
    next();
  },
};
