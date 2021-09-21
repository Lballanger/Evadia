const Commune = require("../controllers/commune");

const searchController = {
  findByName: async (request, response) => {
    try {
      const { name } = request.params;
      const commune = await Commune.fincByName(name);
      response.json(commune);
    } catch (error) {
      console.log(error);
      response.status(500).json(error.message);
    }
  },

  findRandom: async (request, response) => {
    try {
      const commune = await Commune.findByName();
      response.json(commune);
    } catch (error) {
      console.log(error);
      response.status(500).json(error.message);
    }
  },

  findByCriteria: async (request, response) => {
    try {
      // a faire
    } catch (error) {
      console.log(error);
      response.status(500).json(error.message);
    }
  },
};

module.exports = searchController;
