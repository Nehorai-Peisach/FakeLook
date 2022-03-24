const router = require('express').Router();
const axios = require('axios');
const logger = require('../../logger');
const DOMAIN_NAME = process.env.DOMAIN_NAME;
const AUTH_PORT = process.env.AUTH_PORT;

router.route('/sign-in').post((req, res) => {
  logger.info(JSON.stringify(req.body), 'gw/auth/signin', 'Request from client');
  axios
    .post(DOMAIN_NAME + AUTH_PORT + '/sign-in', req.body)
    .then((result) => {
      logger.debug(JSON.stringify(result.data), 'gw/auth/signin', 'result.data');
      res.send(result.data);
    })
    .catch((err) => {
      logger.error(err);
    });
});

router.route('/sign-up').post((req, res) => {
  logger.info(JSON.stringify(req.body), 'gw/auth/signup', 'Request from client');
  axios
    .post(DOMAIN_NAME + AUTH_PORT + '/sign-up', req.body)
    .then((result) => {
      logger.debug(JSON.stringify(result.data), 'gw/auth/signup', 'result.data');
      res.send(result.data);
    })
    .catch((err) => {
      logger.error(err);
    });
});

module.exports = router;
