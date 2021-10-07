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
      const { rows } = await client.query('SELECT * FROM private.get_all($1)', [
        codeInsee,
      ]);
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
  static async findDetailsForVisitor(codeInsee) {
    try {
      const { rows } = await client.query(
        'SELECT * FROM private.details_visitors($1)',
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
      const { rows } = await client.query(
        'SELECT * FROM private.criteria($1)',
        [params]
      );
      return rows.map((row) => new Commune(row));
    } catch (error) {
      console.log(error);
      throw new Error(error.detail ? error.detail : error.message);
    }
  }

  /**
   * Fetch a city by its code_insee and user_id
   * @param {string} code_insee
   * @param {integer} user
   * @async
   * @static
   * @returns {Array<Commune>} new instance of city found or null
   * @throws {Error} if the query didn't match any city in the database
   */
  static async findByFavorite(insee, user) {
    try {
      const { rows } = await client.query(
        'SELECT * FROM private.user_has_commune WHERE commune_code_insee = $1 AND user_id=$2',
        [insee, user]
      );
      if (rows.length > 0) {
        return new Commune(rows[0]);
      }
      return null;
    } catch (error) {
      console.log(error);
      throw new Error(error.detail ? error.detail : error.message);
    }
  }

  /**
   * Insert a city in favorite/blacklist for a user
   * @param {string} code_insee
   * @param {integer} user
   * @param {boolean} boolean
   * @async
   * @static
   * @throws {Error} if the query didn't match any city in the database
   */
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

  /**
   * Delete a city from favorite/blacklist for a user
   * @param {string} code_insee
   * @param {integer} user
   * @async
   * @static
   * @throws {Error} if the query didn't match any city in the database
   */
  static async delete(insee, user) {
    try {
      await client.query(
        'DELETE FROM private.user_has_commune WHERE commune_code_insee=$1 AND user_id=$2',
        [insee, user]
      );
    } catch (error) {
      console.log(error);
      throw new Error(error.detail ? error.detail : error.message);
    }
  }

  /**
   * Update a city in favorite/blacklist for a user
   * @param {string} code_insee
   * @param {integer} user
   * @param {boolean} boolean
   * @async
   * @static
   * @throws {Error} if the query didn't match any city in the database
   */
  static async update(insee, user, boolean) {
    try {
      await client.query(
        'UPDATE private.user_has_commune SET is_favorite=$3 WHERE commune_code_insee=$1 AND user_id=$2',
        [insee, user, boolean]
      );
    } catch (error) {
      console.log(error);
      throw new Error(error.detail ? error.detail : error.message);
    }
  }

  /**
   * Fetch a city by its user_id
   * @param {string} user_id
   * @async
   * @static
   * @returns {Array<Commune>} new instance of city found or null
   * @throws {Error} if the query didn't match any city in the database
   */
  static async bookmarks(user) {
    try {
      const { rows } = await client.query(
        'SELECT * FROM private.user_has_commune WHERE user_id=$1',
        [user]
      );
      if (rows.length > 0) {
        return new Commune(rows);
      }
      return null;
    } catch (error) {
      console.log(error);
      throw new Error(error.detail ? error.detail : error.message);
    }
  }
}

module.exports = Commune;
