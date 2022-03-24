require('dotenv').config();
const express = require('express');
const logger = require('../logger');
const profileService = require('./services/profileService');
const searchService = require('./services/searchService');

const PORT = process.env.FRIENDS_PORT;
const app = express();
app.use(express.json());

app.post('/search', async (req, res) => {
  try {
    const result = await searchService(req.body);
    logger.debug(result, 'fri/app/search', 'found in search');
    if (result) res.send(result);
    else res.send(null);
  } catch (error) {
    logger.error(error, 'fri/app/search', 'An error occurred');
    res.send(null);
  }
});

app.post('/profile', async (req, res) => {
  try {
    const result = await profileService(req.body);
    logger.debug(result, 'fri/app/profile', 'found profile');
    if (result) res.send(result);
    else res.send(null);
  } catch (error) {
    logger.error(error, 'fri/app/profile', 'An error occurred');
    res.send(null);
  }
});

app.listen(PORT, () => {
  logger.http(`friends_service is running on port:${PORT}`, 'connected');
});

app.get('/', (req, res) => {
  res.send('Connected!');
});
