/* eslint-disable quotes */
const client = require('../database');

/**
 * An entity representing a contact message
 * @typedef User
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {string} subject
 * @property {string} message
 * @property {boolean} seen
 * @property {string} created_at
 */
class Contact {
  /**
   * The Message class
   * @param {object} obj a literal object with the following properties: id?, name, email, subject, message, seen?, created_at
   */
  constructor(obj = {}) {
    // eslint-disable-next-line guard-for-in
    for (const propName in obj) {
      this[propName] = obj[propName];
    }
  }

  static async getAll(offset, limit) {
    try {
      const { rows } = await client.query(
        "SELECT (SELECT count(*) FROM private.contact) AS count, (SELECT COALESCE(json_agg(m.*), '[]'::json) FROM (SELECT * FROM private.contact AS c ORDER BY c.updated_at ASC OFFSET $1 LIMIT $2) AS m) AS messages",
        [offset, limit]
      );
      return rows[0];
      // return rows.map((row) => new Contact(row));
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getOne(id) {
    try {
      const { rows } = await client.query(
        'SELECT * FROM private.contact WHERE id = $1',
        [id]
      );
      if (!rows.length) return null;
      return new Contact(rows[0]);
    } catch (error) {
      throw new Error(error);
    }
  }

  async create() {
    try {
      const { rows } = await client.query(
        'INSERT INTO private.contact (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING *',
        [this.name, this.email, this.subject, this.message]
      );
      if (!rows.length) return null;
      return new Contact(rows[0]);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateSeen() {
    try {
      const { rows } = await client.query(
        'UPDATE private.contact SET seen = $2, updated_at = NOW()::TIMESTAMPTZ WHERE id = $1 RETURNING *',
        [this.id, !this.seen]
      );
      if (!rows.length) return null;
      return new Contact(rows[0]);
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete() {
    try {
      await client.query('DELETE FROM private.contact WHERE id = $1', [
        this.id,
      ]);
      return true;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = Contact;
