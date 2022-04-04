const router = require('express').Router();
const axios = require('axios');
const logger = require('../../logger');

const DOMAIN_NAME = process.env.DOMAIN_NAME;
const POSTS_PORT = process.env.POSTS_PORT;

router.route('/new-post').post((req, res) => {
  let data = req.body;
  axios
    .post(DOMAIN_NAME + POSTS_PORT + '/new-post', req.body)
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => {
      logger.error('posts:' + err);
    });
});

router.route('/friends-posts').post((req, res) => {
  let data = {
    user_id: req.body.user_id,
    index: req.body.index,
  };
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
  let filters = req.body.filters;
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
  let data = req.body.post_info;
  axios
    .post(DOMAIN_NAME + POSTS_PORT + '/like', req.body)
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => {
      logger.error(err, '/gateway_service/routes/postRoutes');
    });
});

router.route('/comment').post((req, res) => {
  let data = req.body.commentInfo;
  axios
    .post(DOMAIN_NAME + POSTS_PORT + '/comment', req.body)
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => {
      logger.error(err, '/gateway_service/routes/postRoutes');
    });
});

router.route('/getComments').post((req, res) => {
  let data = {
    post_id: req.body.post_id,
  };
  axios
    .post(DOMAIN_NAME + POSTS_PORT + '/getComments', req.body)
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => {
      logger.error(err, '/gateway_service/routes/postRoutes');
    });
});

router.route('/getPostsByUserId').post((req, res) => {
  let data = { user_id: req.body.user_id };
  axios
    .post(DOMAIN_NAME + POSTS_PORT + '/getPostsByUserId', req.body)
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => {
      logger.error(err, '/gateway_service/routes/getPostsByUserId');
    });
});

router.route('/removePostById').post((req, res) => {
  let data = {
    user_id: req.body.user_id,
    post_id: req.body.post_id,
  };
  axios
    .post(DOMAIN_NAME + POSTS_PORT + '/removePostById', req.body)
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => {
      logger.error(err, '/gateway_service/routes/removePostById');
    });
});

module.exports = router;
