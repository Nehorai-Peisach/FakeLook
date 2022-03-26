const router = require('express').Router();
const logger = require('../../logger');
const Post = require('../models/Post');
const { find } = require('../models/User');
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

router.route('/friends-posts').post(async (req, res) => {
  console.log('in database');
  const user_id = req.body.user_id;
  const index = req.body.index;
  const user = await User.findById(user_id);
  const posts = [];
  for (let i = 0; i < user.friends_id.length; i++) {
    const element = user.friends_id[i];
    const p = await Post.find({ user_id: element });
    posts.push(...p);
  }
  console.log(posts);
  res.send(posts);
});

router.route('/get-posts').get((req, res) => {
  Post.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      logger.error(err, '/database_service/routes/postRouter');
    });
});

module.exports = router;
