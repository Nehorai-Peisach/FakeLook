import axios from 'axios';
import Cookies from 'universal-cookie';

export default async function getPostsByUserId(userId) {
  const cookies = new Cookies();
  const user = cookies.get('user');
  const token = user.accessToken;
  try {
    const result = await axios.post(
      'http://localhost:4000/api/posts/getPostsByUserId',
      { token: token, user_id: userId }
    );
    return result.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
