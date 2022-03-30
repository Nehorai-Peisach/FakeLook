import axios from 'axios';
import Cookies from 'universal-cookie';

export default async function editProfileService(newUser, user, setUser) {
  const cookies = new Cookies();
  const u = cookies.get('user');
  const token = u.accessToken;
  try {
    const tmpUser = user;
    const tmp = await axios.post(
      'http://localhost:4000/api/friends/editProfile',
      { token, newUser }
    );

    tmpUser.name = tmp.data.name;
    tmpUser.image_url = tmp.data.image_url;
    tmpUser.nickname = tmp.data.nickname;
    tmpUser.bio = tmp.data.bio;
    tmpUser.email = tmp.data.email;

    setUser('user', { data: tmpUser });
  } catch (err) {
    console.log(err);
    return false;
  }
}
