import httpReq from 'services/httpReq';

export default async (filters) => {
  const data = filters;
  const result = await httpReq('posts/map-filters', data, 'mapFiltersServices');
  return result.data;
};
