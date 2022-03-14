const express = require('express');
const logger = require('../logger');
const app = express();

app.listen(4001, () => {
  logger.silly(`Connected to ${4001}`);
});

app.get('/', (req, res) => {
  res.send('Connected!');
});
