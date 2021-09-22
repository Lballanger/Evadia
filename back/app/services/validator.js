module.exports = {
  // eslint-disable-next-line consistent-return
  validateQuery: (schema) => (request, response, next) => {
    const { error } = schema.validate(request.query);
    if (error) {
      return response.status(400).json(error.message);
    }
    next();
  },
};
