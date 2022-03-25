import axios from 'axios';
export default async function getProfileService(id) {
  try {
    const result = await axios.post('http://localhost:4000/api/friends/getprofile', { user_id: id });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
}
