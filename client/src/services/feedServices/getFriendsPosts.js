import axios from 'axios';
import Cookies from 'universal-cookie';

export default async function getFriendsPosts(id, index) {
  const cookies = new Cookies();
  const user = cookies.get('user');
  const token = user.accessToken;
  try {
    const result = await axios.post(
      'http://localhost:4000/api/posts/friends-posts',
      { token: token, user_id: id, index: index }
    );
    if (result.status === 401 || result.status === 403) return null;
    return result.data;
  } catch (error) {
    console.log(error);
    return '';
  }
}
