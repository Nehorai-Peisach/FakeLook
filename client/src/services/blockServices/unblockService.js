import httpReq from 'services/httpReq';

export default async (userId, blockedUserId) => {
  const data = {
    user_id: userId,
    blocked_user_id: blockedUserId,
  };
  const result = await httpReq('friends/unblock', data);
  return result.data;
};
