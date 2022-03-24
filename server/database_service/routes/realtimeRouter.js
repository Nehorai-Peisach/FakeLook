const router = require('express').Router();
const logger = require('../../logger');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

router.route('/like').post(async (req, res) => {
  const user_id = req.body.user_id;
  const post_id = req.body.post_id;

  const post = await Post.findById(post_id);
  if (post.users_like.find((id) => id == user_id) === undefined) {
    post.users_like.push(user_id);
    res.send({ isLike: true });
  } else {
    const index = post.users_like.indexOf(user_id);
    post.users_like.splice(index, 1);
    Post.findByIdAndUpdate(post_id, post);
    res.send({ isLike: false });
  }
});

router.route('/comment').post(async (req, res) => {
  try {
    const comment = req.body.comment;
    const newComment = new Comment(comment);
    newComment.save();
    res.send(true);
  } catch (error) {
    logger.error(error);
    res.send(false);
  }
});

module.exports = router;
