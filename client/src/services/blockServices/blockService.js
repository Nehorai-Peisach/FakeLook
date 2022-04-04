import httpReq from 'services/httpReq';
import updateProfileService from 'services/profileServices/updateProfileService';

export default async (userId, blockedUserId) => {
  const data = {
    user_id: userId,
    blocked_user_id: blockedUserId,
  };
  const result = await httpReq('friends/block', data, 'blockService');
  await updateProfileService(userId);

  return result.data;
};
