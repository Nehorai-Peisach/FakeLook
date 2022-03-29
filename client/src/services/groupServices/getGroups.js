import axios from 'axios';

export default async function getGroups(user_id) {
  try {
    const result = await axios.post(
      'http://localhost:4000/api/friends/getGroups',
      { user_id }
    );
    if (result) return result.data;
  } catch (err) {
    console.log(err);
  }
}
