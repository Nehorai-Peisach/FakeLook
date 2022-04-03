import httpReq from 'services/httpReq';

export default async (input, id) => {
  const data = { input: input, user_id: id };
  const result = await httpReq('friends/search', { data });

  return result.data;
};
