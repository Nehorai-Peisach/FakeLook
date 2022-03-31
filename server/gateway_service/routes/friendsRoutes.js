const router = require('express').Router();
const axios = require('axios');
const logger = require('../../logger');

const DOMAIN_NAME = process.env.DOMAIN_NAME;
const FRIENDS_PORT = process.env.FRIENDS_PORT;

router
  .route('/search')
  .post(async (req, res) =>
    res.send(
      await doCommand(
        { input: req.body.data.input, user_id: req.body.data.user_id },
        'search'
      )
    )
  );

router
  .route('/getprofile')
  .post(async (req, res) =>
    res.send(await doCommand({ user_id: req.body.user_id }, 'getprofile'))
  );

router
  .route('/editprofile')
  .post(async (req, res) =>
    res.send(await doCommand({ newUser: req.body.newUser }, 'editprofile'))
  );

router
  .route('/addfriend')
  .post(async (req, res) =>
    res.send(
      await doCommand(
        { user_id: req.body.user_id, friend_id: req.body.friend_id },
        'addfriend'
      )
    )
  );

router
  .route('/removefriend')
  .post(async (req, res) =>
    res.send(
      await doCommand(
        { user_id: req.body.user_id, friend_id: req.body.friend_id },
        'removefriend'
      )
    )
  );

router
  .route('/newGroup')
  .post(async (req, res) =>
    res.send(
      await doCommand(
        { user_id: req.body.user_id, group: req.body.group },
        'newGroup'
      )
    )
  );

router
  .route('/getGroups')
  .post(async (req, res) =>
    res.send(await doCommand({ user_id: req.body.user_id }, 'getGroups'))
  );

const doCommand = async (data, destination) => {
  logger.info(
    JSON.stringify(data),
    'gw/routes/fri/' + destination,
    'Request from client'
  );
  const result = await axios.post(
    DOMAIN_NAME + FRIENDS_PORT + '/' + destination,
    data
  );
  if (result) {
    logger.debug(
      JSON.stringify(result.data),
      'gw/routes/fri/' + destination,
      'result.data'
    );
    return result.data;
  }
  logger.error(err, 'gw/routes/fri/' + destination);
  return null;
};

module.exports = router;
