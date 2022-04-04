import httpReq from 'services/httpReq';

export default async (id) => {
  const data = { user_id: id };
  const result = await httpReq('friends/getprofile', data, 'getProfileService');

  return result.data;
};
