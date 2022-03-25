import axios from 'axios';
export default async function removeFriendService(userId, friendId) {
  try {
    const result = await axios.post('http://localhost:4000/api/friends/removefriend', { user_id: userId, friend_id: friendId });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
}
