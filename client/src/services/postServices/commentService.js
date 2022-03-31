import axios from 'axios';
import Cookies from 'universal-cookie';

export default function commentService(commentInfo, user_id, socket) {
  // commentInfo is with the comment (text, author, post) and the user_id
  // that the post belongs to for the realtime notifications.
  const cookies = new Cookies();
  const user = cookies.get('user');
  const token = user.accessToken;
  axios
    .post('http://localhost:4000/api/posts/comment', { token, commentInfo })
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
