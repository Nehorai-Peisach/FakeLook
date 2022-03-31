import axios from 'axios';
import Cookies from 'universal-cookie';

export default async function removeFriendService(userId, friendId) {
  const cookies = new Cookies();
  const user = cookies.get('user');
  const token = user.accessToken;
  try {
    const result = await axios.post(
      'http://localhost:4000/api/friends/removefriend',
      { token: token, user_id: userId, friend_id: friendId }
    );
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
}
