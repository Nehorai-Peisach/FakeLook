const router = require('express').Router();
const logger = require('../../logger');
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

router.route('/new-post').post(async (req, res) => {
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
  const userPosts = await Post.find({ user_id: user_id });
  for (let i = 0; i < userPosts.length; i++) {
    const post = userPosts[i];
    postsAndUsers.push({ post: post, user: user });
  }

  postsAndUsers.sort((a, b) => new Date(b.post.date) - new Date(a.post.date));
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

router.route('/like').post(async (req, res) => {
  const user_id = req.body.user_id;
  const post_id = req.body.post_id;
  let isLiked;
  const post = await Post.findById(post_id);
  if (post.users_like.includes(user_id)) {
    const index = post.users_like.indexOf(user_id);
    post.users_like.splice(index, 1);
    isLiked = false;
  } else {
    post.users_like.push(user_id);
    isLiked = true;
  }
  await Post.findByIdAndUpdate(post_id, { users_like: post.users_like });
  res.send(isLiked);
});

router.route('/comment').post(async (req, res) => {
  const user_id = req.body.user_id;
  const post_id = req.body.post_id;
  const text = req.body.text;
  try {
    const newComment = new Comment({
      text: text,
      user_id: user_id,
      post_id: post_id,
      users_like: [],
      date: Date.now()
    });
    await newComment.save().then(async (comment) => {
      const post = await Post.findById(post_id);
      post.comments.push(comment._id);
      await Post.findByIdAndUpdate(post_id, { comments: post.comments });
    });
    res.send(true);
  } catch (err) {
    logger.error(err, '/database_service/routes/postRouter');
    res.send(false);
  }
});

router.route('/getComments').post(async (req, res) => {
  const post_id = req.body.post_id;
  const post = await Post.findById(post_id);
  let commentsData = [];
  if (post) {
    for (let i = 0; i < post.comments.length; i++) {
      const id = post.comments[i];
      const comment = await Comment.findById(id);
      const user = await User.findById(comment.user_id);
      console.log(comment, user);
      commentsData.push({
        comment: comment,
        nickname: user.nickname,
        image_url: user.image_url
      });
    }
  }
  console.log(commentsData);
  res.send(commentsData);
});

module.exports = router;
