const axios = require('axios');
const logger = require('../../logger');

const DOMAIN_NAME = process.env.DOMAIN_NAME;
const DB_PORT = process.env.DB_PORT;

module.exports = async function unblockService(blockInfo) {
  const result = await axios.post(
    DOMAIN_NAME + DB_PORT + '/api/friendsRoutes/unblock',
    blockInfo
  );
  if (result) {
    logger.debug(result.data, 'fri/ser/unblockService');
    return result.data;
  }
  logger.error(err, 'fri/ser/unblockService');
  return null;
};
