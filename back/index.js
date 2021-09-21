require('dotenv').config();
const express = require('express');
const router = require('./app/router');

const app = express();
const port = process.env.PORT || 4500;

app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
