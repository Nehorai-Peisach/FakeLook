import axios from 'axios';
import Cookies from 'universal-cookie';

export default async function signUpService(name, email, password) {
  const newUser = {
    name: name,
    email: email,
    password: password,
  };

  const user = await axios.post('http://localhost:4000/api/auth/sign-up', newUser);
  if (user.data === '') {
    console.log(`user ${name} is not in the database`);
  } else {
    const cookies = new Cookies();
    cookies.set('token', user.data.accessToken);
    console.log(`user ${name} is connected!`);
    return user.data;
  }
}
