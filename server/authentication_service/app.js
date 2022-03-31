require('dotenv').config();
const express = require('express');
const logger = require('../logger');
const loginService = require('./services/loginService');
const registerService = require('./services/registerService');
const jwt = require('jsonwebtoken');
const nicknameService = require('./services/nicknameService');

const PORT = process.env.AUTH_PORT;
const app = express();
app.use(express.json());

app.post('/sign-in', async (req, res) => {
  try {
    const result = await loginService(req.body);
    console.log('here is: ' + JSON.stringify(result));
    if (result)
      res.send({ data: result, accessToken: generateAccessToken(result) });
    else res.send(null);
  } catch (error) {
    logger.error('An error occurred', error, 'auth/app/signin');
    res.send(null);
  }
});

app.post('/sign-up', async (req, res) => {
  try {
    const result = await registerService(req.body);
    res.send(result);
  } catch (error) {
    logger.error('An error occurred', error, 'auth/app/signup');
    res.send(null);
  }
});

app.post('/nickname', async (req, res) => {
  try {
    const result = await nicknameService(req.body);
    res.send(result);
  } catch (error) {
    logger.error('An error occurred', error, 'auth/app/nickname');
    res.send(null);
  }
});

function generateAccessToken(user) {
  const username = { name: user.username };
  return jwt.sign(username, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '900s'
  });
}

app.listen(PORT, () => {
  logger.http(`Authentication_server is running on port:${PORT}`);
});
