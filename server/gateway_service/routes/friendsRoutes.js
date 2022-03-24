const router = require('express').Router();
const axios = require('axios');
const logger = require('../../logger');

const DOMAIN_NAME = process.env.DOMAIN_NAME;
const FRIENDS_PORT = process.env.FRIENDS_PORT;

router.route('/search').post((req, res) => {
  logger.info(JSON.stringify(req.body), 'gw/routes/fri/search', 'Request from client');
  axios
    .post(DOMAIN_NAME + FRIENDS_PORT + '/search', req.body)
    .then((result) => {
      logger.debug(JSON.stringify(result.data), 'gw/routes/fri/search', 'result.data');
      res.send(result.data);
    })
    .catch((err) => {
      logger.error(err, 'gw/routes/fri/search');
    });
});

router.route('/profile').post((req, res) => {
  logger.info(JSON.stringify(req.body), 'gw/routes/fri/profile', 'Request from client');
  axios
    .post(DOMAIN_NAME + FRIENDS_PORT + '/profile', req.body)
    .then((result) => {
      logger.debug(JSON.stringify(result.data), 'gw/routes/fri/profile', 'result.data');
      res.send(result.data);
    })
    .catch((err) => {
      logger.error(err, 'gw/routes/fri/profile');
    });
});

module.exports = router;
