import axios from 'axios';
export default async function searchServices(input, id) {
  try {
    const tmp = { input: input, user_id: id };
    const result = await axios.post(
      'http://localhost:4000/api/friends/search',
      tmp
    );
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}
