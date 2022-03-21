require('dotenv').config();
const express = require('express');
const logger = require('../logger/index');
const loginService = require('./services/loginService');
const jwt = require('jsonwebtoken');

const PORT = process.env.AUTH_PORT;
const app = express();

app.use(express.json());

app.post('/sign-in', async (req, res) => {
  try {
    const result = await loginService(req.body);
    const accessToken = generateAccessToken(result);
    res.send({ data: result, accessToken: accessToken });
  } catch (error) {
    logger.error('auth.sign-in:' + error);
  }
});

function generateAccessToken(user) {
  const username = { name: user.username };
  return jwt.sign(username, user._id, {
    expiresIn: '1800s',
  });
}

app.listen(PORT, () => {
  logger.http(`Authentication_server is running on port:${PORT}`);
});
