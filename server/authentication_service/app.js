require('dotenv').config();
const express = require('express');
const app = express();
const Logger = require('../logger/index');

const PORT = process.env.PORT;

app.listen(PORT, () => {
  Logger.silly(`Connected to ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Connected!');
});
