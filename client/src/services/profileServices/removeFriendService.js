import httpReq from 'services/httpReq';

export default async (userId, friendId) => {
  const data = { user_id: userId, friend_id: friendId };
  const result = await httpReq('friends/removefriend', data);
  return result.data;
};
