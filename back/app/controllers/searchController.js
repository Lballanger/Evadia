const Commune = require('../models/commune');

const searchController = {
  /**
   * Express middleware sending the common search to the browser
   * @route /api/search/city
   * @method GET
   * @param {Request} request
   * @param {Response} response
   */
  findByName: async (request, response) => {
    try {
      const { name } = request.body.query;
      const commune = await Commune.findByName(name);
      response.json(commune);
    } catch (error) {
      console.log(error);
      response.status(500).json(error.message);
    }
  },

  /**
   * Express middleware sending a random common to the browser
   * @route /api/search/random
   * @method GET
   * @param {_} request
   * @param {Response} response
   */
  randomSearch: async (_, response) => {
    try {
      const commune = await Commune.randomSearch();
      response.json(commune);
    } catch (error) {
      console.log(error);
      response.status(500).json(error.message);
    }
  },

  /**
   * Express middleware sending the common searches to the browser
   * @route /api/search/criteria
   * @method POST
   * @param {Request} request
   * @param {Response} response
   */
  findByCriteria: async (request, response) => {
    try {
      const commune = await Commune.findByCriteria();
      response.json(commune);
    } catch (error) {
      console.log(error);
      response.status(500).json(error.message);
    }
  },
};

module.exports = searchController;
