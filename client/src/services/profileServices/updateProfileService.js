import axios from 'axios';
import Cookies from 'universal-cookie';

export default async function updateProfileService(id, setUser) {
  const cookies = new Cookies();
  const user = cookies.get('user');
  const token = user.accessToken;
  try {
    const user = await axios.post(
      'http://localhost:4000/api/friends/getprofile',
      { token: token, user_id: id }
    );
    setUser('user', user);
  } catch (err) {
    console.log(err);
    return false;
  }
}
