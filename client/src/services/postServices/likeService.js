import httpReq from 'services/httpReq';

export default (userInfo, postInfo, isLike, socket) => {
  const data = { post_info: postInfo };
  const result = httpReq('posts/like', data);
  if (result && userInfo.user_id !== postInfo.user_id)
    socket.emit('like_post', { user_info: userInfo, post_info: postInfo, is_like: isLike });

  return result.data;
};
