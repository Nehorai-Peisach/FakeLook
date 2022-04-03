import httpReq from 'services/httpReq';

export default async (filters) => {
  const result = await httpReq('posts/map-filters', filters);
  return result.data;
};
