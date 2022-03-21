const router = require('express').Router();
const axios = require('axios');
const logger = require('../../logger');

const DOMAIN_NAME = process.env.DOMAIN_NAME;
const POSTS_PORT = process.env.POSTS_PORT;

router.route('/new-post').post((req, res) => {
  axios
    .post(DOMAIN_NAME + POSTS_PORT + '/new-post', req.body)
    .then((result) => {
      // console.log(result.data);
      res.send(result.data);
    })
    .catch((err) => {
      logger.error(err);
    });
});

module.exports = router;
