import axios from 'axios';
import Cookies from 'universal-cookie';

export default async function updateProfileService(id, setUser) {
  try {
    const user = await axios.post('http://localhost:4000/api/friends/getprofile', { user_id: id });
    setUser('user', user);
  } catch (err) {
    console.log(err);
    return false;
  }
}
