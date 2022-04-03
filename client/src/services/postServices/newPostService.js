import httpReq from 'services/httpReq';

export default async (postInfo) => {
  const result = await httpReq('posts/new-post', postInfo);
  return result.data;
};
