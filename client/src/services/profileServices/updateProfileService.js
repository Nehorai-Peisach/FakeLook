import axios from 'axios';
import Cookies from 'universal-cookie';

export default async function updateProfileService(id, setUser) {
  const cookies = new Cookies();
  const user = cookies.get('user');
  const token = user.accessToken;
  try {
    const profile = await axios.post(
      'http://localhost:4000/api/friends/getprofile',
      { token: token, user_id: id }
    );

    const userCookie = {
      data: {
        _id: profile.data._id,
        nickname: profile.data.nickname,
        image_url: profile.data.image_url,
        friends_id: profile.data.friends_id,
        block_list: profile.data.block_list
      },
      accessToken: user.accessToken
    };
    setUser('user', userCookie);
  } catch (err) {
    console.log(err);
    return false;
  }
}
