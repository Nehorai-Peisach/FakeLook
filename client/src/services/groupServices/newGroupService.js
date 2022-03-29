import axios from 'axios';

export default async function newGroupServices(user_id, group) {
  try {
    const result = await axios.post(
      'http://localhost:4000/api/friends/newGroup',
      { user_id, group }
    );
    if (result) return result.data;
  } catch (err) {
    console.log(err);
  }
}
