import axios from 'axios';

export default function commentService(commentInfo, user_id, socket) {
  // commentInfo is with the comment (text, author, post) and the user_id
  // that the post belongs to for the realtime notifications.
  axios
    .post('http://localhost:4000/api/posts/comment', commentInfo)
    .then((result) => {
      if (result.data) {
        console.log('comment Added Successfully');
        // socket.emit()
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
