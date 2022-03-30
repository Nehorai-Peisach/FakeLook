import axios from 'axios';
import Cookies from 'universal-cookie';

export default async function newGroupServices(user_id, group) {
  const cookies = new Cookies();
  const user = cookies.get('user');
  const token = user.accessToken;
  try {
    const result = await axios.post(
      'http://localhost:4000/api/friends/newGroup',
      { token, user_id, group }
    );
    if (result) return result.data;
  } catch (err) {
    console.log(err);
  }
}
