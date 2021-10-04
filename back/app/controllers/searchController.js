const Commune = require('../models/commune');

const searchController = {
  /**
   * Method sending the common search to the browser
   * @route /api/search/city
   * @method GET
   * @param {Request} request
   * @param {Response} response
   */
  findByName: async (request, response) => {
    try {
      console.log('test');
      if (request.query.ville) {
        console.log('query = ', request.query.ville);
        const { name } = request.query.ville;
        const commune = await Commune.findByName(name);
        response.json(commune);
      } else {
        response.status(400).json({ error: 'No query to execute ... 🤔' });
      }
    } catch (error) {
      console.log(error);
      response.status(500).json(error.message);
    }
  },

  /**
   * Method that returns the commune by its code_insee
   * @route /api/search/city/:insee
   * @method GET
   * @param {Request} request
   * @param {Response} response
   */
  findByInsee: async (request, response) => {
    try {
      const { insee } = request.params;
      const commune = await Commune.findByCodeInsee(insee);
      response.json(commune);
    } catch (error) {
      console.log(error);
      response.status(500).json(error.message);
    }
  },

  /**
   * Method sending a random common to the browser
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
   * Method sending the common searches to the browser
   * @route /api/search/criteria
   * @method POST
   * @param {Request} request
   * @param {Response} response
   */
   findByCriteria: async (request, response) => {
    const params = {...request.body};
    const authorize = ['pharmacie', 'centre hospitalier', 'crèche'];
    const temps = [];
    let typeHealthInstitution = null;
    if (params.type_health_institution) {
      typeHealthInstitution = params.type_health_institution.map( elem => elem.toLowerCase());
    }
    
    try {

      // condition if the user is not connected
      if (!request.user) {
        //deleting the key for a visitor
        delete params.type_personal_health;

        if (typeHealthInstitution) {
          for (const value of authorize) {
            for (const elem of typeHealthInstitution) {
              if (elem.includes(value)) {
                const result = elem.includes(value);
                temps.push(elem);
              }  
            }
          }            
          if (temps.length > 0 ) params.type_health_institution = temps;
          console.log(params);
        }
      }
      const commune = await Commune.findByCriteria(params);
      response.json(commune);

    } catch (error) {
      console.log(error);
      response.status(500).json(error.message);
    }
  },

  /**
   * Method cheking if city is a favorite, if not add it or delete or modify
   * @route /api/search/city/:insee/check
   * @method POST
   * @param {Request} request
   * @param {Response} response
   */
  addFavorite: async (request, response) => {
    try {
      const { insee } = request.params;
      const { user: id } = request.user;
      const { boolean } = request.query;
      const commune = await Commune.findByFavorite(insee, id);
      if (commune === null) {
        // if commune is not register in favorite then add
        await Commune.add(insee, id, boolean);
        // eslint-disable-next-line eqeqeq
      } else if (`${commune.is_favorite}` == boolean) {
        // delete if is true in coming and register as true (the opposite is true too)
        await Commune.delete(insee, id);
      } else {
        // change if is true in coming and register as false (the opposite also work)
        await Commune.update(insee, id, boolean);
      }
      response.json(commune);
    } catch (error) {
      console.log(error);
      response.status(500).json(error.message);
    }
  },
};

module.exports = searchController;
