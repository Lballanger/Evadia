const client = require('../database');

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
   * @returns {Array<Commune>}
   * @async
   * @static
   */
  static async findByName(query) {
    try {
      const { rows } = await client.query(
        'SELECT * FROM commune WHERE city_name = $1',
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
   * @returns {Array<Commune>}
   * @async
   * @static
   */
  static async randomSearch() {
    try {
      const id = Math.floor(Math.random() * (34095 - 1) + 1);
      const { rows } = await client.query(
        'SELECT * FROM commune WHERE id=$1',
        id
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
   * @returns {Array<Commune>}
   * @async
   * @static
   */
  static async findByCriteria() {
    try {
      const { rows } = await client.query('SELECT * FROM commune WHERE ');
      return rows.map((row) => new Commune(row));
    } catch (error) {
      console.log(error);
      throw new Error(error.detail ? error.detail : error.message);
    }
  }
}

module.exports = Commune;
