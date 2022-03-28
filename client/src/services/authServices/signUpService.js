import axios from 'axios';

export default async function regularSignUpService(name, username, email, password) {
  const newUser = {
    name: name,
    username: username,
    email: email,
    password: password,
  };
  const result = await signup(newUser);
  return result;
}
export async function googleSignUpService(name, email, google_id) {
  const newUser = {
    name: name,
    email: email,
    google_id: google_id,
  };
  const result = await signup(newUser);
  return result;
}
export async function facebookSignUpService(name, email, facebook_id) {
  const newUser = {
    name: name,
    email: email,
    facebook_id: facebook_id,
  };
  const result = await signup(newUser);
  return result;
}

const signup = async (newUser) => {
  const user = await axios.post('http://localhost:4000/api/auth/sign-up', newUser);
  if (user.data) return user.data;
  return null;
};
