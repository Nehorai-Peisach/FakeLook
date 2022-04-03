import httpReq from 'services/httpReq';

export default async (userId, nickname) => {
  const data = {
    user_id: userId,
    nickname: nickname,
  };
  const result = await httpReq('auth/nickname', {data});
  return result.data;
};
