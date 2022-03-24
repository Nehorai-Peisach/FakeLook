export default function realtimeLikeService(socket, user_id, post_id) {
  socket.emit('like_post', { user_id: user_id, post_id: post_id });
}
