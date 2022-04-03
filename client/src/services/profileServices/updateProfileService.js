import httpReq from 'services/httpReq';

export default async (id, user, setUser) => {
  const data = { user_id: id };
  const result = await httpReq('friends/getprofile', data);

  const userCookie = {
    data: {
      _id: result.data._id,
      nickname: result.data.nickname,
      image_url: result.data.image_url,
      friends_id: result.data.friends_id,
      block_list: result.data.block_list,
    },
    accessToken: user.accessToken,
  };

  setUser('user', userCookie);
  return result.data;
};
