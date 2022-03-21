const router = require('express').Router();
const logger = require('../../logger');
const Post = require('../models/Post');

router.route('/new-post').post((req, res) => {
  console.log(req.body);
  const newPost = new Post({
    image_id: req.body.image_id,
    location: req.body.location,
    date: req.body.date,
    user_id: req.body.user_id,
    text: req.body.text,
    tags: req.body.tags,
    userTags: req.body.userTags
  });
  try {
    newPost.save();
    res.send({ msg: true });
  } catch (error) {
    logger.error(error);
    res.sendStatus(400).send({ msg: false });
  }
});

module.exports = router;
