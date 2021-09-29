const client = require('../database');

/**
 * An entity representing an identified user
 * @typedef User
 * @property {number} id
 * @property {string} firstname
 * @property {string} lastname
 * @property {string} email
 * @property {string} password
 * @property {string} role
 */
class User {
  /**
   * The User class
   * @param {object} obj a literal object with the following properties: id?, firstname, lastname, email, password, role
   */
  constructor(obj = {}) {
    // eslint-disable-next-line guard-for-in
    for (const propName in obj) {
      this[propName] = obj[propName];
    }
  }

  /**
   * Function that return a user from the database if found or null if not
   * @param {number} id the id of the user to find
   * @async
   * @static
   * @returns {User<object>} new instance of user or null
   * @throws {Error} if the id didn't match any user in the database
   */
  static async getById(id) {
    try {
      const result = await client.query(
        // eslint-disable-next-line quotes
        "SELECT u.*,json_build_object('code_insee', c.code_insee, 'code_departement', c.code_departement, 'code_postal', c.code_postal, 'code_region', c.code_region, 'city_name', c.city_name, 'coordinates', c.coordinates, 'population', c.population) AS city FROM private.\"user\" AS u JOIN private.commune AS c ON c.code_insee = u.city WHERE u.id = $1 GROUP BY u.id, c.code_insee",
        [id]
      );
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Function that return a user from the database if found or null if not
   * @param {string} email the email of the user to find
   * @async
   * @static
   * @returns {User<object>} new instance of user or null
   * @throws {Error} if the email didn't match any user in the database
   */
  static async getByEmail(email) {
    try {
      const { rows } = await client.query(
        'SELECT * FROM private."user" WHERE email = $1',
        [email]
      );
      if (rows.length === 0) {
        return null;
      }
      return new User(rows[0]);
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Function that create a new user in the database
   * @async
   * @returns {User<object>} new instance of user
   * @throws {Error} if something went wrong during the query or if the user already exists
   */
  async create() {
    try {
      const { rows } = await client.query(
        'INSERT INTO private."user" (firstname, lastname, email, password, city, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [
          this.firstname,
          this.lastname,
          this.email,
          this.password,
          this.city,
          this.role,
        ]
      );
      return new User(rows[0]);
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Function that update the current instance of user in the database
   * @async
   * @returns {User<object>} new instance of user
   * @throws {Error} if something went wrong during the query or if the user doesn't exist
   */
  async update() {
    try {
      const { rows } = await client.query(
        'UPDATE private."user" SET firstname = $1, lastname = $2, password = $3, city = $4 role = $5 WHERE id = $6 RETURNING *',
        [
          this.firstname,
          this.lastname,
          this.password,
          this.city,
          this.role,
          this.id,
        ]
      );
      return new User(rows[0]);
    } catch (err) {
      throw new Error(err);
    }
  }

  async delete() {
    try {
      await client.query('DELETE FROM private."user" WHERE id = $1', [this.id]);
      return true;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = User;
