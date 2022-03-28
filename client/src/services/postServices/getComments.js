import axios from 'axios';

export default async function getComments(post_id) {
  try {
    const result = await axios.post(
      'http://localhost:4000/api/posts/getComments',
      { post_id }
    );
    return result.data;
  } catch (err) {
    console.log(err);
  }
}
