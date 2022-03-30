import axios from 'axios';
import Cookies from 'universal-cookie';

export default async function mapFiltersService(filters) {
  const cookies = new Cookies();
  const user = cookies.get('user');
  const token = user.accessToken;
  console.log(filters);
  try {
    const result = await axios.post(
      'http://localhost:4000/api/posts/map-filters',
      { token, filters }
    );
    return result.data;
  } catch (err) {
    console.log(err);
  }
}
