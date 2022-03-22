import axios from 'axios';
import Cookies from 'universal-cookie';

export default async function signUpService(name, username, email, password) {
  const newUser = {
    name: name,
    username: username,
    email: email,
    password: password,
  };

  const user = await axios.post('http://localhost:4000/api/auth/sign-up', newUser);
  if (user) {
    const cookies = new Cookies();
    cookies.set('token', user.data.accessToken);
    return user.data;
  }
  return null;
}
