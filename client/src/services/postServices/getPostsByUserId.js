import httpReq from 'services/httpReq';

export default async (userId) => {
  const data = { user_id: userId };
  const result = await httpReq('posts/getPostsByUserId', data);
  return result.data;
};
