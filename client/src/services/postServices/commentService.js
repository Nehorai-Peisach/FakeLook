import axios from 'axios';

export default function commentService(commentInfo) {
  axios
    .post('http://localhost:4000/api/posts/comment', likeInfo)
    .then((result) => {
        if (result.data) {
            // socket.emit()
        }
    })
    .catch((err) => {
      console.log(err);
    });
}
