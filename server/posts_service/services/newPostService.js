const axios = require('axios');
const logger = require('../../logger');

const DOMAIN_NAME = process.env.DOMAIN_NAME;
const DB_PORT = process.env.DB_PORT;

module.exports = async function newPostService(postInfo) {
  const result = await axios.post(DOMAIN_NAME + DB_PORT + '/api/postsRoutes/new-post', postInfo);
  if (!result.data) {
    logger.error('failed to upload new post');
  }
  return result.data;
};
