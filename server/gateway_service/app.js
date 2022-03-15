require('dotenv').config();
const express = require('express');
const logger = require('../logger');
const app = express();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  logger.http(`Connected to ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Connected!');
});
