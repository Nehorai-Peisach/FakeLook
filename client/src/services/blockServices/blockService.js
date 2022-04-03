import axios from 'axios';
import Cookies from 'universal-cookie';

export default async function getGroups(userId, blokedUserId) {
  const cookies = new Cookies();
  const user = cookies.get('user');
  const token = user.accessToken;
  try {
    const result = await axios.post('http://localhost:4000/api/friends/block', {
      token: token,
      blockInfo: {
        user_id: userId,
        bloked_user_id: blokedUserId
      }
    });
    if (result) return result.data;
  } catch (err) {
    console.log(err);
  }
}
