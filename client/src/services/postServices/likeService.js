import axios from 'axios';

export default function likeService(likeInfo, socket) {
  console.log('in client service');
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
