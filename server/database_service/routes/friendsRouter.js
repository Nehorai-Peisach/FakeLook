const router = require('express').Router();
const logger = require('../../logger');
const User = require('../models/User');

router.route('/search').post(async (req, res) => {
  logger.info(JSON.stringify(req.body), 'db/rou/fri/search', 'Search requst');
  const input = req.body.input;
  const currentUserId = req.body.user_id;
  const users = await User.find();
  const fltered = users.filter(
    (x) =>
      x.nickname &&
      x.nickname.toLowerCase().includes(input.toLowerCase()) &&
      x._id.toString() !== currentUserId
  );

  const tmp = fltered.map((x) => {
    return { _id: x._id, nickname: x.nickname, image_url: x.image_url };
  });
  logger.debug(tmp, 'db/rou/fri/search', 'Users that found');
  res.send(tmp);
});

router.route('/getprofile').post(async (req, res) => {
  const userId = req.body.user_id;

  logger.info(
    JSON.stringify(userId),
    'db/rou/fri/getprofile',
    'profile requst'
  );
  const user = await User.findOne({ _id: userId });


  const tmp = {
    _id: user._id,
    name: user.name,
    image_url: user.image_url,
    nickname: user.nickname,
    bio: user.bio,
    friends_id: user.friends_id,
    posts_id: user.posts_id,
    email: user.email,
  };
  logger.debug(tmp, 'db/rou/fri/getprofile', 'profile found');
  res.send(tmp);
});

router.route('/editProfile').post(async (req, res) => {
  const userId = req.body._id;

  logger.info(JSON.stringify(userId), 'db/rou/fri/getprofile', 'profile requst');
  const user = await User.findByIdAndUpdate(userId, {
    name: req.body.name,
    image_url: req.body.image_url,
    nickname: req.body.nickname,
    bio: req.body.bio,
    email: req.body.email,
  });

  logger.debug(user, 'db/rou/fri/getprofile', 'profile found');
  res.send(user);
});

router.route('/addfriend').post(async (req, res) => {
  const userId = req.body.user_id;
  const friendId = req.body.friend_id;
  logger.info(
    JSON.stringify(userId),
    'db/rou/fri/addfriend',
    'addfriend requst'
  );
  const user = await User.findOne({ _id: userId });
  const newFriends = [...user.friends_id, friendId];
  await User.findByIdAndUpdate(userId, { friends_id: newFriends });
  logger.debug(newFriends, 'db/rou/fri/addfriend', 'new friends list');
  res.send(true);
});

router.route('/removefriend').post(async (req, res) => {
  const userId = req.body.user_id;
  const friendId = req.body.friend_id;
  logger.info(
    JSON.stringify(userId),
    'db/rou/fri/removefriend',
    'removefriend requst'
  );
  const user = await User.findOne({ _id: userId });
  const newFriends = user.friends_id.filter((id) => {
    return id !== friendId;
  });
  await User.findByIdAndUpdate(userId, { friends_id: newFriends });
  logger.debug(newFriends, 'db/rou/fri/removefriend', 'new friends list');
  res.send(true);
});

router.route('/newGroup').post(async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const group = req.body.group;
    const user = await User.findById(user_id);
    user.friends_groups.push(group);
    await User.findByIdAndUpdate(user_id, {
      friends_groups: user.friends_groups
    });
    res.send(true);
  } catch (err) {
    logger.error(err, 'db/rou/fri/newGroup');
    res.send(false);
  }
});

router.route('/getGroups').post(async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const user = await User.findById(user_id);
    res.send(user.friends_groups);
  } catch (err) {
    logger.error(err, 'db/rou/fri/getGroups');
    res.send([]);
  }
});

module.exports = router;
