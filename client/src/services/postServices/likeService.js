import axios from 'axios';
import Cookies from 'universal-cookie';

export default function likeService(userInfo, postInfo, isLike, socket) {
    const cookies = new Cookies();
  const user = cookies.get('user');
  const token = user.accessToken;
  axios
    .post('http://localhost:4000/api/posts/like', {token,postInfo})
    .then((result) => {
      if (result.data)
        if (userInfo.user_id !== postInfo.user_id) {
        socket.emit('like_post', { user_info: userInfo, post_info: postInfo, is_like: isLike });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
