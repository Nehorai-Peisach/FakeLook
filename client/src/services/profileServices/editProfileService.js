import axios from 'axios';

export default async function editProfileService(newUser, user, setUser) {
  try {
    const tmpUser = user;
    const tmp = await axios.post('http://localhost:4000/api/friends/editProfile', newUser);

    tmpUser.name = tmp.name;
    tmpUser.image_url = tmp.image_url;
    tmpUser.nickname = tmp.nickname;
    tmpUser.bio = tmp.bio;
    tmpUser.email = tmp.email;

    setUser('user', tmpUser);
  } catch (err) {
    console.log(err);
    return false;
  }
}
