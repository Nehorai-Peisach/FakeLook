import axios from 'axios';

export default async function nicknameService(userId, nickname) {
  const result = await axios.post('http://localhost:4000/api/auth/nickname', { user_id: userId, nickname: nickname });
  return result.data;
}
