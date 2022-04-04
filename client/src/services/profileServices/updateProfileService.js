import httpReq from 'services/httpReq';
import Cookies from 'universal-cookie';

export default async (id) => {
  const cookies = new Cookies();
  const user = cookies.get('user');

  const data = { user_id: id };
  const result = await httpReq('friends/getprofile', data, 'updateProfileService');

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

  await cookies.set('user', userCookie);
  // window.location.reload(false);

  return result.data;
};
