const client = require('../database');

class Commune {
  constructor(obj = {}) {
    // eslint-disable-next-line guard-for-in
    for (const propName in obj) {
      this[propName] = obj[propName];
    }
  }

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

  static async findRandom() {
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
