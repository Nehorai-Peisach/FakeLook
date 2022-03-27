require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('../logger');
const newPostService = require('./services/newPostService');
const getFriendsPosts = require('./services/getFriendsPosts');
const mapFiltersService = require('./services/mapFiltersService');
const likeService = require('./services/likeService');
const app = express();

const PORT = process.env.POSTS_PORT;

app.use(express.json());
app.use(cors());

app.post('/new-post', async (req, res) => {
  try {
    const result = await newPostService(req.body);
    res.send(result);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ msg: false });
  }
});

app.post('/friends-posts', async (req, res) => {
  console.log('in posts');
  try {
    const result = await getFriendsPosts(req.body);
    res.send(result);
  } catch (err) {
    logger.error(err, 'posts_service/app');
  }
});

app.post('/map-filters', async (req, res) => {
  try {
    const result = await mapFiltersService(req.body);
    res.send(result);
  } catch (err) {
    logger.error(err, 'posts_service/app');
  }
});

app.post('/like', async (req, res) => {
  try {
    const result = await likeService(req.body);
    res.send(result);
  } catch (err) {
    logger.error(err, 'posts_service/app');
  }
});

app.listen(PORT, () => {
  logger.http(`Posts_service is running on port:${PORT}`);
});
