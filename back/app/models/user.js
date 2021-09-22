const client = require('../database');

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

  static async getByEmail(email) {
    try {
      const { rows } = await client.query(
        'SELECT * FROM user WHERE email = $1',
        [email]
      );
      if (rows.length === 0) {
        throw new Error('User not found');
      }
      return new User(rows[0]);
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = User;
