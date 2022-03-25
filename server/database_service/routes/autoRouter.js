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
        const retUser = { _id: result._id, nickname: result.nickname, image_id: result.image_id, friends_id: result.friends_id };
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
    image_id: '2F467c912f-4ce6-47c7-a51d-245c1b3fa9c5.png',
    username: req.body.username || null,
    email: req.body.email,
    password: req.body.password || null,
    google_id: req.body.google_id || null,
    facebook_id: req.body.facebook_id || null,
    nickname: null,
    bio: "Hey there I'm using FakeLook!",
  });

  User.findOne({ email: newUser.email })
    .then(async (userFound) => {
      if (userFound) {
        logger.info('Already registed to that Email');
        newUser._id = userFound._id;
        if (newUser.google_id) await googleSignup(newUser);
        else if (newUser.facebook_id) await facebookSignup(newUser);
        else await regularSignup(newUser);
        res.send(true);
      } else {
        try {
          logger.info('Email is free to register');
          newUser.save().then(() => {
            logger.info('User registed');
            res.send(true);
          });
        } catch (error) {
          logger.error(error);
          res.sendStatus(400).send(false);
        }
      }
    })
    .catch((err) => {
      logger.error(err);
    });
});

const regularSignup = async (user) => {
  await User.findByIdAndUpdate(user._id, { password: user.password, username: user.username });
  logger.info('User Updated');
};
const facebookSignup = async (user) => {
  await User.findByIdAndUpdate(user._id, { facebook_id: user.facebook_id });
  logger.info('User Updated');
};
const googleSignup = async (user) => {
  await User.findByIdAndUpdate(user._id, { google_id: user.google_id });
  logger.info('User Updated');
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
            const retUser = { _id: result._id, nickname: result.nickname, image_id: result.image_id };
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
