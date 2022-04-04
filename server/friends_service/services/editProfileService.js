const axios = require('axios');
const logger = require('../../logger');

const DOMAIN_NAME = process.env.DOMAIN_NAME;
const DB_PORT = process.env.DB_PORT;

module.exports = async function editProfileService(user) {
  const result = await axios.post(DOMAIN_NAME + DB_PORT + '/api/friendsRoutes/editprofile', user);
  if (result) {
    logger.debug(result.data, 'fri/ser/editProfile', 'user get:');
    return result.data;
  }
  logger.error(`user id[${userId}] not found`, 'fri/ser/editProfile');
  return null;
};
