const axios = require('axios');
const logger = require('../../logger');

const DOMAIN_NAME = process.env.DOMAIN_NAME;
const DB_PORT = process.env.DB_PORT;

module.exports = async function removePostByIdService(data) {
  console.log('in post getFriendsPostService');
  try {
    console.log(data);
    const result = await axios.post(DOMAIN_NAME + DB_PORT + '/api/postsRoutes/removePostById', data);
    return result.data;
  } catch (error) {
    logger.error(error, 'post_service/services/removePostByIdService');
    return '';
  }
};
