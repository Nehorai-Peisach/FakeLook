import axios from 'axios';
import Cookies from 'universal-cookie';

export default async (url, body, from) => {
  const cookies = new Cookies();
  const user = cookies.get('user');
  const token = user.accessToken;

  console.log(body, from);

  try {
    const result = await axios.post('http://localhost:4000/api/' + url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (err) {
    cookies.remove('user');
    console.log(err);
    window.location.reload(false);
    return null;
  }
};
