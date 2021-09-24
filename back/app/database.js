const { Pool } = require('pg');

const ssl = {};

if (process.env.NODE_ENV === 'production') {
  ssl.rejectUnauthorized = false;
}

const config = {
  connectionString: process.env.DATABASE_URL,
  ssl,
};

const pool = new Pool(config);

module.exports = pool;
