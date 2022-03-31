import axios from 'axios';
import Cookies from 'universal-cookie';

export default async function searchServices(input, id) {
  const cookies = new Cookies();
  const user = cookies.get('user');
  const token = user.accessToken;
  try {
    const tmp = { input: input, user_id: id };
    const result = await axios.post(
      'http://localhost:4000/api/friends/search',
      { token: token, data: { input: tmp.input, user_id: tmp.user_id } }
    );
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}
