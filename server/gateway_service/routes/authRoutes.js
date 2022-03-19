const router = require('express').Router();
const axios = require('axios');
const logger = require('../../logger');

const DOMAIN_NAME = process.env.DOMAIN_NAME;
const AUTH_PORT = process.env.AUTH_PORT;

router.route('/login').post((req, res) => {
  console.log('in gateway');
  console.log(req.body);
  axios
    .post(DOMAIN_NAME + AUTH_PORT + '/login', req.body)
    .then((result) => {
      console.log(result);
      res.send(result.data);
    })
    .catch((err) => {
      logger.error(err);
    });
});

module.exports = router;
