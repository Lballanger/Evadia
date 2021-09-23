const client = require('../database');

/**
 * An entity representing a common
 * @typedef Commune
 * @property {string} code_insee
 * @property {string} code_departement
 * @property {string} code_postal
 * @property {string} code_region
 * @property {string} city_name
 * @property {integer} population
 */
class Commune {
  /**
   * The class Commune
   * @param {Object} obj a literal object with properties copied into the instance
   */
  constructor(obj = {}) {
    // eslint-disable-next-line guard-for-in
    for (const propName in obj) {
      this[propName] = obj[propName];
    }
  }

  /**
   * Fetches a common from the database
   * @param {string} query
   * @async
   * @static
   * @returns {Array<Commune>} new instance of common or null
   * @throws {Error} if the query didn't match any common in the database
   */
  static async findByName(query) {
    try {
      const { rows } = await client.query(
        'SELECT * FROM commune WHERE code_insee = $1',
        [query]
      );
      return rows.map((row) => new Commune(row));
    } catch (error) {
      console.log(error);
      throw new Error(error.detail ? error.detail : error.message);
    }
  }

  /**
   * Fetches a random common from the database
   * @async
   * @static
   * @returns {Array<Commune>} new instance of common or null
   * @throws {Error} if the query didn't match any common in the database
   */
  static async randomSearch() {
    try {
      const { rows } = await client.query(
        'SELECT * FROM commune ORDER BY RANDOM() LIMIT 1'
      );
      return rows.map((row) => new Commune(row));
    } catch (error) {
      console.log(error);
      throw new Error(error.detail ? error.detail : error.message);
    }
  }

  /**
   * Fetches all common matching the criteria from the database
   * @param {*}
   * @async
   * @static
   * @returns {Array<Commune>} new instance of common or null
   * @throws {Error} if the query didn't match any common in the database
   */
  static async findByCriteria(params) {
    try {
      // 1. envoyer en BDD les critaires pour checker les commune
      // 2. returning tout les code_insee de chaque commune correspondants aux critaires
      const correspondingCommon = await client.query(
        'SELECT commune_code FROM fonction where $1=$1',
        params
      );
      // 3. renvoyer le resultat au front
      const { rows } = await client.query(
        'SELECT * FROM commune WHERE code_insee=$1',
        correspondingCommon
      );
      return rows.map((row) => new Commune(row));
    } catch (error) {
      console.log(error);
      throw new Error(error.detail ? error.detail : error.message);
    }
  }
}

module.exports = Commune;
