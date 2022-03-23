const router = require('express').Router();
const logger = require('../../logger');
const Post = require('../models/Post');
const User = require('../models/User');

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

router.route('/friends-posts').get(async (req, res) => {
  const user_id = req.body.user_id;
  const index = req.body.index;
  const user = await User.findById(user_id);
  const posts = await Post.find((post) => user.friends_id.find(post.user_id))
    .sort('-date')
    .limit(index + 10)
    .splice(index, 10);
  res.send(posts);
});

module.exports = router;
