require('dotenv').config();
const express = require('express');
const logger = require('../logger');
const app = express();
const MongoDb = require('./database/database');
const authRouter = require('./routes/autoRouter');
const database = new MongoDb();

const PORT = process.env.PORT;

app.use(express.json());
app.use('/api/authRoutes', authRouter);

database
  .connect()
  .then(() => {
    logger.info('Database is on!');
    app.listen(PORT, () => {
      logger.http(`Connected to ${PORT}`);
    });
  })
  .catch((err) => logger.error(err));
