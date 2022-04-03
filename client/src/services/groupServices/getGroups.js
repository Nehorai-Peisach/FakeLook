import httpReq from 'services/httpReq';

export default async (userId) => {
  const data = { user_id: userId };
  const result = await httpReq('friends/getGroups', data);
  return result.data;
};
