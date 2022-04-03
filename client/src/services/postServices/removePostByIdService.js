import axios from 'axios';
import Cookies from 'universal-cookie';

export default async function removePostByIdService(postId) {
  const cookies = new Cookies();
  const user = cookies.get('user');
  const token = user.accessToken;
  try {
    const result = await axios.post('http://localhost:4000/api/posts/removePostById', { token: token, user_id: user.data._id, post_id: postId });
    return result.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
