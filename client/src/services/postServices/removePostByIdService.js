import httpReq from 'services/httpReq';

export default async (post) => {
  const data = { image_id: post.image_id, user_id: post.user_id };
  const result = await httpReq('posts/removePostById', data);
  return result.data;
};
