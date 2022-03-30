import axios from 'axios';
import Cookies from 'universal-cookie';

export default function likeService(likeInfo, user_id, socket) {
  const cookies = new Cookies();
  const user = cookies.get('user');
  const token = user.accessToken;
  axios
    .post('http://localhost:4000/api/posts/like', { token, likeInfo })
    .then((result) => {
      if (result.data) {
        // socket.emit()
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
