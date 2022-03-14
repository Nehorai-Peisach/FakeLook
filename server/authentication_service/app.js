const express = require('express');
const app = express();
const Logger = require('../logger/index');

app.listen(4002, () => {
  Logger.silly(`Connected to ${4002}`);
});

app.get('/', (req, res) => {
  res.send('Connected!');
});
