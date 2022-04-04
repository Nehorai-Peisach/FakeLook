import httpReq from 'services/httpReq';

export default async (postId) => {
  const data = { post_id: postId };
  const result = await httpReq('posts/getComments', data);
  return result.data;
};
