const express = require('express');
const logger = require('../logger');
const app = express();

app.listen(4003, () => {
  logger.silly(`Connected to ${4003}`);
});

app.get('/', (req, res) => {
  res.send('Connected!');
});
