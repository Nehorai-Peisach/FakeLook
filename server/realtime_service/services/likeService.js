const axios = require('axios');
const logger = require('../../logger');

const DOMAIN_NAME = process.env.DOMAIN_NAME;
const DB_PORT = process.env.DB_PORT;

module.exports = async function likeService(likeInfo) {
  try {
    const result = await axios.post(
      DOMAIN_NAME + DB_PORT + '/api/realtimeRoutes/like',
      likeInfo
    );
    return result;
  } catch (error) {
    logger.error(error);
  }
};
