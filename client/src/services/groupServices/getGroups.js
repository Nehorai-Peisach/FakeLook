import axios from 'axios';
import Cookies from 'universal-cookie';

export default async function getGroups(user_id) {
  const cookies = new Cookies();
  const user = cookies.get('user');
  const token = user.accessToken;
  try {
    const result = await axios.post(
      'http://localhost:4000/api/friends/getGroups',
      { token: token, user_id }
    );
    if (result) return result.data;
  } catch (err) {
    console.log(err);
  }
}
