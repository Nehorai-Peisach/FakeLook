const router = require('express').Router();
const logger = require('../../logger');
const User = require('../models/User');

router.route('/search').post(async (req, res) => {
  logger.info(JSON.stringify(req.body), 'db/rou/fri/search', 'Search requst');
  const input = req.body.input;
  const currentUserId = req.body.user_id;
  const users = await User.find();
  const fltered = users.filter((x) => x.nickname && x.nickname.includes(input) && x._id.toString() !== currentUserId);

  const tmp = fltered.map((x) => {
    return { _id: x._id, nickname: x.nickname, image_url: x.image_url };
  });
  logger.debug(tmp, 'db/rou/fri/search', 'Users that found');
  res.send(tmp);
});

router.route('/getprofile').post(async (req, res) => {
  const userId = req.body.user_id;
  logger.info(JSON.stringify(userId), 'db/rou/fri/getprofile', 'profile requst');
  const user = await User.findOne({ _id: userId });

  const tmp = {
    _id: user._id,
    image_url: user.image_url,
    nickname: user.nickname,
    bio: user.bio,
    friends_id: user.friends_id,
    posts_id: user.posts_id,
  };
  logger.debug(tmp, 'db/rou/fri/getprofile', 'profile found');
  res.send(tmp);
});

router.route('/addfriend').post(async (req, res) => {
  const userId = req.body.user_id;
  const friendId = req.body.friend_id;
  logger.info(JSON.stringify(userId), 'db/rou/fri/addfriend', 'addfriend requst');
  const user = await User.findOne({ _id: userId });
  const newFriends = [...user.friends_id, friendId];
  await User.findByIdAndUpdate(userId, { friends_id: newFriends });
  logger.debug(newFriends, 'db/rou/fri/addfriend', 'new friends list');
  res.send(true);
});

router.route('/removefriend').post(async (req, res) => {
  const userId = req.body.user_id;
  const friendId = req.body.friend_id;
  logger.info(JSON.stringify(userId), 'db/rou/fri/removefriend', 'removefriend requst');
  const user = await User.findOne({ _id: userId });
  const newFriends = user.friends_id.filter((x) => {
    x._id && x._id.tostring() !== friendId;
  });
  await User.findByIdAndUpdate(userId, { friends_id: newFriends });
  logger.debug(newFriends, 'db/rou/fri/removefriend', 'new friends list');
  res.send(true);
});

module.exports = router;
