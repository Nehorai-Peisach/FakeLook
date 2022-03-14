const express = require('express');
const logger = require('../logger');
const app = express();

app.listen(4006, () => {
  logger.silly(`Connected to ${4006}`);
});

app.get('/', (req, res) => {
  res.send('Connected!');
});
