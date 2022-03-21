require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('../logger');
const newPostService = require('./services/newPostService');
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

app.listen(PORT, () => {
  logger.http(`Posts_service is running on port:${PORT}`);
});
