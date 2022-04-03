import httpReq from 'services/httpReq';

export default async (userId, group) => {
  const data = { user_id: userId, group: group };
  const result = await httpReq('friends/newGroup', data);
  return result.data;
};
