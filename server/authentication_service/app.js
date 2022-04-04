require('dotenv').config();
const express = require('express');
const logger = require('../logger');
const jwt = require('jsonwebtoken');
const loginService = require('./services/signInService');
const registerService = require('./services/signUpService');
const nicknameService = require('./services/nicknameService');

const PORT = process.env.AUTH_PORT;
const app = express();
app.use(express.json());

app.post('/sign-in', async (req, res) => {
  const result = await callService(loginService, req.body);
  if (result) res.send({ data: result, accessToken: generateAccessToken(result) });
  else res.send(null);
});

app.post('/sign-up', async (req, res) => res.send(await callService(registerService, req.body)));

app.post('/nickname', async (req, res) => res.send(await callService(nicknameService, req.body)));

const callService = async (service, reqBody) => {
  try {
    const result = await service(reqBody);
    return result;
  } catch (error) {
    logger.error(error, 'auth/app');
    return null;
  }
};

const generateAccessToken = (user) => {
  const username = { name: user.username };
  return jwt.sign(username, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '900s',
  });
};

app.listen(PORT, () => {
  logger.http(`Authentication_server is running on port:${PORT}`);
});
