// commentInfo is with the comment (text, author, post) and the user_id
// that the post belongs to for the realtime notifications.

import httpReq from 'services/httpReq';

export default async (commentInfo, user_id, socket) => {
  const data = { commentInfo };
  const result = await httpReq('posts/comment', data);
  console.log('comment Added Successfully');
  return result.data;
};
