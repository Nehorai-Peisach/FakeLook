import axios from 'axios';
import Cookies from 'universal-cookie';

export default async function signInService(username, password) {
  const newUser = {
    username: username,
    password: password,
  };
  const user = await axios.post('http://localhost:4000/api/auth/sign-in', newUser);
  if (user) {
    const cookies = new Cookies();
    cookies.set('token', user.data.accessToken);
    cookies.set('user', user.data);
    return user.data;
  }
  return null;
}
