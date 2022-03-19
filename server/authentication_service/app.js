require('dotenv').config();
const express = require('express');
const app = express();
const logger = require('../logger/index');
const loginService = require('./services/loginService');

const PORT = process.env.PORT;

app.use(express.json());

app.post('/login', async (req, res) => {
  try {
    const result = await loginService(req.body);
    res.send(result);
  } catch (error) {
    logger.error(error);
  }
});

app.listen(PORT, () => {
  logger.silly(`Authentication_server is running on port:${PORT}`);
});
