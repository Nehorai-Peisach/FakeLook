const axios = require('axios');
const logger = require('../../logger');

const DOMAIN_NAME = process.env.DOMAIN_NAME;
const DB_PORT = process.env.DB_PORT;

module.exports = async function searchService(input) {
  const result = await axios.post(DOMAIN_NAME + DB_PORT + '/api/friendsRoutes/search', input);
  if (result) {
    logger.debug(result.data, 'fri/ser/search', 'users found:');
    return result.data;
  }
  logger.error(`users with [${input}] not found`, 'fri/ser/search');
  return null;
};
