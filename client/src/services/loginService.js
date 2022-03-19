import axios from 'axios';
// import logger from '../../logger';

const DOMAIN_NAME = process.env.DOMAIN_NAME;
const GATEWAY_PORT = process.env.GATEWAY_PORT;

export default async function loginService(username, password) {
  const newUser = {
    username: username,
    password: password
  };
  const user = await axios.post(
    'http://localhost:4000/api/authRoutes/login',
    newUser
  );
  // logger.http(`User ${res.data.username} as loged in`);
  if (user.data === '') {
    console.log(`user ${username} is not in the database`);
  } else {
    console.log(`user ${username} is connected!`);
    console.log(user.data);
    return user.data;
  }
}
