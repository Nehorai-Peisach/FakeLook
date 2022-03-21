const router = require('express').Router();
const axios = require('axios');
const logger = require('../../logger');

const DOMAIN_NAME = process.env.DOMAIN_NAME;
const AUTH_PORT = process.env.AUTH_PORT;

router.route('/sign-in').post((req, res) => {
  logger.debug('sign-in - in gateway');
  logger.debug('sign-in - req.body:' + JSON.stringify(req.body));
  axios
    .post(DOMAIN_NAME + AUTH_PORT + '/sign-in', req.body)
    .then((result) => {
      logger.debug('sign-in - result: ' + result);
      res.send(result.data);
    })
    .catch((err) => {
      logger.error(err);
    });
});

router.route('/sign-up').post((req, res) => {
  logger.debug('sign-up - in gateway');
  logger.debug('sign-up - req.body:' + JSON.stringify(req.body));
  axios
    .post(DOMAIN_NAME + AUTH_PORT + '/sign-up', req.body)
    .then((result) => {
      logger.debug('sign-up - result: ' + result);
      res.send(result.data);
    })
    .catch((err) => {
      logger.error(err);
    });
});

module.exports = router;
