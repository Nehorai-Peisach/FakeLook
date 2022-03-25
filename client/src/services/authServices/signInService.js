import axios from 'axios';
import Cookies from 'universal-cookie';

export default async function regularSignInService(username, password) {
  const newUser = {
    username: username,
    password: password,
  };
  const result = await signin(newUser);
  return result;
}

export async function googleSignInService(google_id) {
  const newUser = {
    google_id: google_id,
  };
  const result = await signin(newUser);
  return result;
}

export async function facebookSignInService(facebook_id) {
  const newUser = {
    facebook_id: facebook_id,
  };
  const result = await signin(newUser);
  return result;
}

const signin = async (newUser) => {
  const user = await axios.post('http://localhost:4000/api/auth/sign-in', newUser);
  if (user) {
    const cookies = new Cookies();
    cookies.set('token', user.data.accessToken);
    cookies.set('user', user.data);
    return user.data;
  }
  return null;
};
