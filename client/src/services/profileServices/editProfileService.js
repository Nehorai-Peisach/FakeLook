import axios from 'axios';

export default async function editProfileService(newUser, user, setUser) {
  try {
    const tmpUser = user;
    const tmp = await axios.post(
      'http://localhost:4000/api/friends/editProfile',
      newUser
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
