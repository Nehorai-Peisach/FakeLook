const router = require('express').Router();
const logger = require('../../logger');
const Post = require('../models/Post');
const User = require('../models/User');

router.route('/new-post').post(async (req, res) => {
  console.log(req.body);
  const newPost = new Post({
    image_id: req.body.image_id,
    location: req.body.location,
    date: req.body.date,
    user_id: req.body.user_id,
    text: req.body.text,
    tags: req.body.tags,
    userTags: req.body.userTags,
  });
  try {
    const user = await User.findById(req.body.user_id);
    const postsId = [...user.posts_id, req.body.image_id];
    await User.findByIdAndUpdate(req.body.user_id, { posts_id: postsId });
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
  const postsAndUsers = [];
  for (let i = 0; i < user.friends_id.length; i++) {
    const id = user.friends_id[i];
    const posts = await Post.find({ user_id: id });
    for (let j = 0; j < posts.length; j++) {
      const post = posts[j];
      const postUser = await User.findById(post.user_id);
      postsAndUsers.push({ post: post, user: postUser });
    }
  }
  res.send(postsAndUsers);
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
