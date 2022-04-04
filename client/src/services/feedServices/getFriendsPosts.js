import httpReq from 'services/httpReq';

export default async (id, index) => {
  const data = { user_id: id, index: index };
  const result = await httpReq('posts/friends-posts', data);
  if (result.status === 401 || result.status === 403) return null;
  return result.data;
};
