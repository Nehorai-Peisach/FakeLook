const router = require('express').Router();
const logger = require('../../logger');
const User = require('../models/User');

router.route('/sign-in').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username: username, password: password })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      logger.error(err);
    });
});

router.route('/sign-up').post((req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const newUser = new User({
    name: name,
    username: username,
    email: email,
    password: password,
  });

  User.findOne({ email: email })
    .then((userFound) => {
      if (userFound) {
        logger.info('Already registed to that Email');
        if (userFound.password) {
          User.deleteOne({ email: email }, (err) => {
            if (err) logger.error(err);
          });
          newUser.save();
          logger.info('User Updated');
          res.send(newUser);
        } else {
          res.send(null);
        }
      } else {
        try {
          logger.info('Email is free to register');
          newUser.save().then(() => {
            logger.info('User registed');
            res.send(newUser);
          });
        } catch (error) {
          logger.error(error);
          res.sendStatus(400).send(null);
        }
      }
    })
    .catch((err) => {
      logger.error(err);
    });
});

module.exports = router;
