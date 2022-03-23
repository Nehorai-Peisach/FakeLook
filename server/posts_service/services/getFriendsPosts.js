const axios = require('axios');
const logger = require('../../logger');

const DOMAIN_NAME = process.env.DOMAIN_NAME;
const DB_PORT = process.env.DB_PORT;

module.exports = async function getFriendsPosts(id) {
  try {
    console.log(id);
    const result = await axios.get(
      DOMAIN_NAME + DB_PORT + '/api/postsRoutes/friends-posts',
      id
    );
    return result.data;
  } catch (error) {
    logger.error(error);
    return '';
  }
};
