import axios from 'axios';

export default function likeService(likeInfo, user_id, socket) {
  axios
    .post('http://localhost:4000/api/posts/like', likeInfo)
    .then((result) => {
      if (result.data) {
        // socket.emit()
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
