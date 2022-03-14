const express = require('express');
const logger = require('../logger');
const app = express();
const MongoDb = require('./database/database');
const database = new MongoDb();

database
  .connect()
  .then(() => {
    logger.info('Database is on!');
    app.listen(4000, () => {
      logger.silly(`Connected to ${4000}`);
    });
  })
  .catch((err) => logger.error(err));

app.get('/', (req, res) => {
  res.send('Connected!');
});
