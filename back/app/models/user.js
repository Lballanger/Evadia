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

  async create() {
    try {
      const { rows } = await client.query(
        'INSERT INTO user (firstname, lastname, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [this.firstname, this.lastname, this.email, this.password, this.role]
      );
      return new User(rows[0]);
    } catch (err) {
      throw new Error(err);
    }
  }

  async update() {
    try {
      const { rows } = await client.query(
        'UPDATE user SET firstname = $1, lastname = $2, password = $3, role = $4 WHERE id = $5 RETURNING *',
        [this.firstname, this.lastname, this.password, this.role, this.id]
      );
      return new User(rows[0]);
    } catch (err) {
      throw new Error(err);
    }
  }

  async delete() {
    try {
      await client.query('DELETE FROM user WHERE id = $1', [this.id]);
      return true;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = User;
