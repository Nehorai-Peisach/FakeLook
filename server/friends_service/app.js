const express = require('express');
const logger = require('../logger');
const app = express();

app.listen(4005, () => {
  logger.silly(`Connected to ${4005}`);
});

app.get('/', (req, res) => {
  res.send('Connected!');
});
