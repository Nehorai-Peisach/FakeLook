const express = require('express');
const logger = require('../logger');
const app = express();

app.listen(4004, () => {
  logger.silly(`Connected to ${4004}`);
});

app.get('/', (req, res) => {
  res.send('Connected!');
});
