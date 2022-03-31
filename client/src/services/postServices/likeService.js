import axios from 'axios';

export default function likeService(userInfo, postInfo, isLike, socket) {
  axios
    .post('http://localhost:4000/api/posts/like', postInfo)
    .then(() => {
      if (userInfo.user_id !== postInfo.user_id) {
        socket.emit('like_post', { user_info: userInfo, post_info: postInfo, is_like: isLike });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
