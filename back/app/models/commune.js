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
        'SELECT * FROM private.commune WHERE code_insee = $1',
        [query]
      );
      return new Commune(rows[0]);
    } catch (error) {
      console.log(error);
      throw new Error(error.detail ? error.detail : error.message);
    }
  }

  /**
   * Fetch a city by its code_insee
   * @param {string} code_insee
   * @async
   * @static
   * @returns {Array<Commune>} new instance of city found or null
   * @throws {Error} if the query didn't match any city in the database
   */
  static async findByCodeInsee(codeInsee) {
    try {
      const { rows } = await client.query(
        'SELECT * FROM private.commune WHERE code_insee = $1',
        [codeInsee]
      );
      return new Commune(rows[0]);
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
        'SELECT * FROM private.commune ORDER BY RANDOM() LIMIT 1'
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
      const {rows} = await client.query(
        'SELECT * FROM private.criteria($1)',
        [params]
      );
      console.log(rows);
      return rows.map((row) => new Commune(row));
    } catch (error) {
      console.log(error);
      throw new Error(error.detail ? error.detail : error.message);
    }
  }

  static async findByFavorite(insee) {
    try {
      const { rows } = await client.query(
        'SELECT * FROM private.user_has_commune WHERE code_insee = $1',
        [insee]
      );
      return new Commune(rows[0]);
    } catch (error) {
      console.log(error);
      throw new Error(error.detail ? error.detail : error.message);
    }
  }

  static async add(insee, user, boolean) {
    try {
      await client.query(
        'INSERT INTO private.user_has_commune (commune_code_insee, user_id, is_favorite) Values ($1, $2, $3)',
        [insee, user, boolean]
      );
    } catch (error) {
      console.log(error);
      throw new Error(error.detail ? error.detail : error.message);
    }
  }

  static async delete(insee) {
    try {
      await client.query(
        'DELETE FROM private.user_has_commune WHERE commune_code_insee=$1',
        [insee]
      );
    } catch (error) {
      console.log(error);
      throw new Error(error.detail ? error.detail : error.message);
    }
  }

  static async update(insee, boolean) {
    try {
      await client.query(
        'UPDATE private.user_has_commune SET is_favorite=$2 WHERE commune_code_insee=$1',
        [insee, boolean]
      );
    } catch (error) {
      console.log(error);
      throw new Error(error.detail ? error.detail : error.message);
    }
  }
}

module.exports = Commune;
