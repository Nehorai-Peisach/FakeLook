const router = require('express').Router();
const axios = require('axios');
const logger = require('../../logger');

const DOMAIN_NAME = process.env.DOMAIN_NAME;
const POSTS_PORT = process.env.POSTS_PORT;

router.route('/new-post').post((req, res) => {
  let data = req.body.postInfo;
  axios
    .post(DOMAIN_NAME + POSTS_PORT + '/new-post', data)
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
    index: req.body.index
  };
  axios
    .post(DOMAIN_NAME + POSTS_PORT + '/friends-posts', data)
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
    .post(DOMAIN_NAME + POSTS_PORT + '/map-filters', filters)
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => {
      logger.error(err, '/gateway_service/routes/postsRoutes');
    });
});

router.route('/like').post((req, res) => {
  let data = req.body.likeInfo;
  axios
    .post(DOMAIN_NAME + POSTS_PORT + '/like', data)
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
    .post(DOMAIN_NAME + POSTS_PORT + '/comment', data)
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => {
      logger.error(err, '/gateway_service/routes/postRoutes');
    });
});

router.route('/getComments').post((req, res) => {
  let data = {
    post_id: req.body.post_id
  };
  axios
    .post(DOMAIN_NAME + POSTS_PORT + '/getComments', data)
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
    .post(DOMAIN_NAME + POSTS_PORT + '/getPostsByUserId', data)
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => {
      logger.error(err, '/gateway_service/routes/getPostsByUserId');
    });
});

module.exports = router;
