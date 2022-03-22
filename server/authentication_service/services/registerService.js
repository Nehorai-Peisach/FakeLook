const axios = require('axios');
const logger = require('../../logger');

const DOMAIN_NAME = process.env.DOMAIN_NAME;
const DB_PORT = process.env.DB_PORT;

module.exports = async function registerService(userInfo) {
  const result = await axios.post(DOMAIN_NAME + DB_PORT + '/api/authRoutes/sign-up', userInfo);
  if (result) {
    return result.data;
  }
  logger.error(`user ${userInfo.username} not found`);
  return null;
};
