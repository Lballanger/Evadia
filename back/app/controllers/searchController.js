const Commune = require('../models/commune');

const searchController = {
  findByName: async (request, response) => {
    try {
      const { name } = request.params;
      const commune = await Commune.findByName(name);
      response.json(commune);
    } catch (error) {
      console.log(error);
      response.status(500).json(error.message);
    }
  },

  findRandom: async (request, response) => {
    try {
      const commune = await Commune.findRandom();
      response.json(commune);
    } catch (error) {
      console.log(error);
      response.status(500).json(error.message);
    }
  },

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
