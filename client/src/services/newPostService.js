import axios from 'axios';

export default async function newPostService(postInfo) {
  try {
    const result = await axios.post(
      'http://localhost:4000/api/posts/new-post',
      postInfo
    );
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
}
