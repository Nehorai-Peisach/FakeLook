const authDatabaseService = require('./authDatabaseService');

module.exports = async (reqBody) => {
  let filter = {};
  if (reqBody.google_id) filter = { google_id: reqBody.google_id };
  else if (reqBody.facebook_id) filter = { facebook_id: reqBody.facebook_id };
  else filter = { username: reqBody.username, password: reqBody.password };

  const result = await authDatabaseService('sign-in', filter);

  if (result) {
    const user = {
      _id: result._id,
      nickname: result.nickname,
      image_url: result.image_url,
      friends_id: result.friends_id,
      block_list: result.block_list,
    };

    return user;
  }

  return false;
};
