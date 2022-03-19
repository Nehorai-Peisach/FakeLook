const axios = require('axios');
const logger = require('../../logger');

const DOMAIN_NAME = process.env.DOMAIN_NAME;
const DATABASE_PORT = process.env.DATABASE_PORT;

module.exports = async function loginService(userInfo) {
  const result = await axios.post(
    DOMAIN_NAME + DATABASE_PORT + '/api/authRoutes/login',
    userInfo
  );
  if (typeof result === 'undefined' || result === null) {
    logger.error(`user ${userInfo.username} not found`);
    return null;
  } else {
    return result.data;
  }
};
