import axios from 'axios';

export default async function getFriendsPosts(id, index) {
  try {
    const result = await axios.get(
      'http://localhost:4000/api/posts/friends-posts',
      { user_id: id, index: index }
    );
    return result.data;
  } catch (error) {
    console.log(error);
    return '';
  }
}
