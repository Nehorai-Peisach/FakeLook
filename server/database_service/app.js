require('dotenv').config();
const express = require('express');
const logger = require('../logger');
const app = express();
const MongoDb = require('./database/database');
const database = new MongoDb();

const PORT = process.env.PORT;

database
  .connect()
  .then(() => {
    logger.info('Database is on!');
    app.listen(PORT, () => {
      logger.http(`Connected to ${PORT}`);
    });
  })
  .catch((err) => logger.error(err));

app.get('/', (req, res) => {
  res.send('Connected!');
});
