require('dotenv').config();
const { Pool } = require('pg');
// const fs = require('fs');

const config = {
  connectionString: process.env.DATABASE_URL,
  // ssl: {
  //     ca: fs.readFileSync(__dirname + '/ca-certificate.crt'),
  // },
  // rejectUnauthorized: true,
};

const pool = new Pool(config);

module.exports = pool;
