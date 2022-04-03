const router = require('express').Router();
const logger = require('../../logger');
const User = require('../models/User');

router.route('/sign-in').post((req, res) => {
  let filter = {};
  if (req.body.google_id) filter = { google_id: req.body.google_id };
  else if (req.body.facebook_id) filter = { facebook_id: req.body.facebook_id };
  else filter = { username: req.body.username, password: req.body.password };

  User.findOne(filter)
    .then((result) => {
      if (result) {
        logger.debug(result, 'db/auth/signin', 'user was found');
        const retUser = {
          _id: result._id,
          nickname: result.nickname,
          image_url: result.image_url,
          friends_id: result.friends_id,
          block_list: result.block_list
        };
        res.send(retUser);
      } else res.send(false);
    })
    .catch((err) => {
      logger.error(err, 'db/auth/signin', 'error in finding user');
    });
});

router.route('/sign-up').post((req, res) => {
  const newUser = new User({
    name: req.body.name,
    image_url:
      'https://firebasestorage.googleapis.com/v0/b/fakelook-storage.appspot.com/o/images%2F467c912f-4ce6-47c7-a51d-245c1b3fa9c5.png?alt=media&token=8e282a32-3bf7-4fab-922d-0699da427ed4',
    username: req.body.username || null,
    email: req.body.email,
    password: req.body.password || null,
    google_id: req.body.google_id || null,
    facebook_id: req.body.facebook_id || null,
    nickname: null,
    bio: "Hey there I'm using FakeLook!"
  });

  User.findOne({ email: newUser.email })
    .then(async (userFound) => {
      if (userFound) {
        logger.info('Already registed to that Email');
        newUser._id = userFound._id;
        let result;
        if (newUser.google_id)
          result = await googleSignup(newUser, userFound.google_id);
        else if (newUser.facebook_id)
          result = await facebookSignup(newUser, userFound.facebook_id);
        else result = await regularSignup(newUser);
        res.send(result);
      } else {
        try {
          logger.info('Email is free to register');
          const check = await User.findOne({ username: newUser.username });
          if (check) {
            logger.info('Username alredy been taken');
            res.send({ msg: 'Username alredy been taken', state: false });
          } else {
            newUser.save().then(() => {
              logger.info('User registed');
              res.send({ msg: 'User registed', state: true });
            });
          }
        } catch (error) {
          logger.error(error);
          res.sendStatus(400).send({ msg: 'Server Error', state: false });
        }
      }
    })
    .catch((err) => {
      logger.error(err);
    });
});

const regularSignup = async (user) => {
  const checks = [];

  const username = await User.findOne({ username: user.username });
  if (username) checks.push('Username');
  if (user.email) checks.push('Email');

  if (checks.length === 0) {
    await User.findByIdAndUpdate(user._id, {
      password: user.password,
      username: user.username
    });
    logger.info('User Updated');
    return { msg: 'Register successs', state: true };
  } else {
    return { msg: `${myPrint(checks)} is alredy taken`, state: false };
  }
};

const myPrint = (arr) => {
  switch (arr.length) {
    case 1:
      return arr[0];
    case 2:
      return arr[0] + ' and ' + arr[1];
    default:
      break;
  }
};

const facebookSignup = async (user, isFacebook) => {
  if (isFacebook)
    return { msg: 'Facebook accout alredy been taken', state: false };
  await User.findByIdAndUpdate(user._id, { facebook_id: user.facebook_id });
  logger.info('User Updated');
  return { msg: 'Register successs', state: true };
};
const googleSignup = async (user, isGoogle) => {
  if (isGoogle) return { msg: 'Google accout alredy been taken', state: false };
  await User.findByIdAndUpdate(user._id, { google_id: user.google_id });
  logger.info('User Updated');
  return { msg: 'Register successs', state: true };
};

router.route('/nickname').post((req, res) => {
  const nickname = req.body.nickname;
  const userId = req.body.user_id;
  User.findOne({ nickname: nickname })
    .then((x) => {
      if (x) res.send(false);
      else {
        User.findOne({ _id: userId })
          .then(async (result) => {
            logger.debug(result, 'db/auth/nickname', 'user was found');
            result.nickname = nickname;
            await User.findByIdAndUpdate(userId, { nickname: nickname });
            const retUser = {
              _id: result._id,
              nickname: result.nickname,
              image_url: result.image_url
            };
            res.send(retUser);
          })
          .catch((err) => {
            logger.error(err, 'db/auth/nickname1', 'error in finding user');
          });
      }
    })
    .catch((err) => {
      logger.error(err, 'db/auth/nickname2', 'error in finding user');
    });
});

module.exports = router;
