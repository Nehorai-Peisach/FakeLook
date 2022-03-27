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
      logger.error('posts:' + err);
    });
});

router.route('/friends-posts').post((req, res) => {
  console.log('in gateway');
  axios
    .post(DOMAIN_NAME + POSTS_PORT + '/friends-posts', req.body)
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => {
      logger.error(err, '/gateway_service/routes/postRoutes');
    });
});

router.route('/map-filters').post((req, res) => {
  axios
    .post(DOMAIN_NAME + POSTS_PORT + '/map-filters', req.body)
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => {
      logger.error(err, '/gateway_service/routes/postsRoutes');
    });
});

router.route('/like').post((req, res) => {
  axios
    .post(DOMAIN_NAME + POSTS_PORT + '/like', req.body)
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => {
      logger.error(err, '/gateway_service/routes/postRoutes');
    });
});

module.exports = router;
