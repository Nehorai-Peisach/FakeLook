import axios from 'axios';
import Cookies from 'universal-cookie';

export default async function getProfileService(id) {
  const cookies = new Cookies();
  const user = cookies.get('user');
  const token = user.accessToken;
  try {
    const result = await axios.post(
      'http://localhost:4000/api/friends/getprofile',
      { token: token, user_id: id }
    );
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
}
