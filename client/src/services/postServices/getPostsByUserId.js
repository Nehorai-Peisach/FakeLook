import axios from 'axios';

export default async function getPostsByUserId(userId) {
  try {
    const result = await axios.post('http://localhost:4000/api/posts/getPostsByUserId', { user_id: userId });
    return result.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
