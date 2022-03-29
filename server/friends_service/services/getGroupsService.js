const axios = require('axios');
const logger = require('../../logger');

const DOMAIN_NAME = process.env.DOMAIN_NAME;
const DB_PORT = process.env.DB_PORT;

module.exports = async function getGroupsService(userId) {
  const result = await axios.post(
    DOMAIN_NAME + DB_PORT + '/api/friendsRoutes/getGroups',
    userId
  );
  if (result) {
    logger.debug(result.data, 'fri/ser/getGroupsService');
    return result.data;
  }
  logger.error('no groups have been found', 'fri/ser/getGroupsService');
  return null;
};
