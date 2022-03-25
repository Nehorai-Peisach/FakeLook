import axios from 'axios';
export default async function addFriendService(userId, friendId) {
  try {
    const result = await axios.post('http://localhost:4000/api/friends/addfriend', { user_id: userId, friend_id: friendId });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
}
