import httpReq from 'services/httpReq';
import updateProfileService from './updateProfileService';

export default async (userId, friendId) => {
  const data = { user_id: userId, friend_id: friendId };
  const result = await httpReq('friends/removefriend', data);
  await updateProfileService(userId);

  return result.data;
};
