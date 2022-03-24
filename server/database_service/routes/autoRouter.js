const router = require('express').Router();
const logger = require('../../logger');
const User = require('../models/User');

router.route('/sign-in').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username: username, password: password })
    .then((result) => {
      logger.debug(result, 'db/auth/signin', 'user was found');
      const retUser = { _id: result._id, nickname: result.nickname, image_id: result.image_id };
      res.send(retUser);
    })
    .catch((err) => {
      logger.error(err, 'db/auth/signin', 'error in finding user');
    });
});

router.route('/sign-up').post((req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const newUser = new User({
    name: name,
    image_id: '467c912f-4ce6-47c7-a51d-245c1b3fa9c5',
    username: username,
    email: email,
    password: password,
    nickname: null,
  });

  User.findOne({ email: email })
    .then((userFound) => {
      if (userFound) {
        logger.info('Already registed to that Email');
        if (!userFound.password) {
          User.findByIdAndUpdate(userFound._id, { password: password, username: username });

          logger.info('User Updated');
          res.send(true);
        } else {
          res.send(false);
        }
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

router.route('/nickname').post((req, res) => {
  const nickname = req.body.nickname;
  const userId = req.body.user_id;
  User.findOne({ _id: userId })
    .then(async (result) => {
      logger.debug(result, 'db/auth/nickname', 'user was found');
      result.nickname = nickname;
      await User.findByIdAndUpdate(userId, { nickname: nickname });
      const retUser = { _id: result._id, nickname: result.nickname, image_id: result.image_id };
      res.send(retUser);
    })
    .catch((err) => {
      logger.error(err, 'db/auth/nickname', 'error in finding user');
    });
});

module.exports = router;
