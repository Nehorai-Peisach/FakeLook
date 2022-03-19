const router = require('express').Router();
const logger = require('../../logger');
const User = require('../models/User');

router.route('/login').post((req, res) => {
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

module.exports = router;
