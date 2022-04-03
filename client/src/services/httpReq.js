import axios from 'axios';
import Cookies from 'universal-cookie';

export default async function httpReq(url, reqInfo) {
  const cookies = new Cookies();
  const user = cookies.get('user');
  const token = user.accessToken;

  try {
    const result = await axios.post(
      url,
      { reqInfo },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
}
