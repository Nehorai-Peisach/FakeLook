import axios from 'axios';
import Cookies from 'universal-cookie';
import logger from 'logger';

export default async function signUpService(username, password) {
  const newUser = {
    username: username,
    password: password,
  };
  const user = await axios.post('http://localhost:4000/api/authRoutes/sign-up', newUser);
  // logger.http(`User ${res.data.username} as loged in`);
  if (user.data === '') {
    console.log(`user ${username} is not in the database`);
  } else {
    const cookies = new Cookies();
    cookies.set('token', user.data.accessToken);
    console.log(`user ${username} is connected!`);
    return user.data;
  }
}
